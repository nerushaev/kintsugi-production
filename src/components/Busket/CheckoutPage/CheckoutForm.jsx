import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GrMail } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/auth-selectors";
import {
  Button,
  ButtonWrapper,
  CustomForm,
  ErrorMessage,
  InputsWrapper,
} from "../../Form/Form.styled";
import { Input } from "../../Input/Input";
import { SelectInput } from "./SelectInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutPageValidation } from "../../../helpers/checkoutPageValidation";
import { selectNovaState } from "../../../redux/nova/nova-selectors";
import { getCities, getWarehouses } from "../../../redux/nova/nova-operation";
import { nanoid } from "@reduxjs/toolkit";
import {
  removeCitiesList,
  selectCity,
  removeWarehousesList,
  selectWarehouse,
} from "../../../redux/nova/nova-slice";
import { orderProducts } from "../../../redux/products/products-operation";
import {
  getBusket,
  selectError,
} from "../../../redux/products/products-selectors";
import useDebounce from "../../../hooks/useDebounce";
import { useAuth } from "../../../hooks/useAuth";

const email_input = {
  name: "email",
  label: "Пошта",
  type: "text",
  id: "email",
  placeholder: "Введіть вашу пошту",
};

const phone_input = {
  name: "phone",
  label: "Мобільний номер",
  type: "phone",
  id: "phone",
  placeholder: "Введіть ваш мобільний номер...",
};

const name_input = {
  name: "name",
  label: "Ім'я та прізвище",
  type: "text",
  id: "name",
  placeholder: "Введіть ваше ім'я та прізвище...",
};

const delivery_select = {
  name: "delivery",
  label: "Спосіб доставки",
  data: [
    { label: "Оберіть спосіб доставки", value: "" },
    { label: "Доставка у відділення Нової Пошти", value: "nova" },
    { label: "Самовивіз м. Одеса ТЦ Афіна Грецька пл. 3/4 ", value: "afina" },
  ],
  id: "delivery",
};

const city_input = {
  name: "city",
  label: "Назва міста або селища",
  type: "text",
  id: "city",
  placeholder: "Введіть назву міста або селища...",
};

const warehouse_input = {
  name: "warehouse",
  label: "Номер відділення",
  type: "text",
  id: "warehouse",
  placeholder: "Введіть номер відділення...",
};

const payments_select = {
  name: "payments",
  label: "Спосіб оплати",
  data: [
    { label: "Оберіть спосіб оплати", value: "" },
    { label: "Накладений платіж", value: "cash" },
    { label: "Онлайн оплата Liqpay", value: "liqpay" },
  ],
  id: "payments",
};

export default function CheckoutForm({ user }) {
  const dispatch = useDispatch();
  const nova = useSelector(selectNovaState);
  const { cities, warehouses } = nova;
  const busket = useSelector(getBusket);
  const error = useSelector(selectError);
  const { delivery } = user;

  const methods = useForm({
    mode: "all",
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      delivery: "",
      city: delivery ? delivery.city : "",
      warehouse: delivery ? delivery.warehouse : "",
      payments: "",
    },
    resolver: yupResolver(checkoutPageValidation),
  });

  const { watch, setValue, reset } = methods;
  const deliverySelect = watch("delivery");
  const city = useDebounce(watch("city"), 800);
  const warehouse = useDebounce(watch("warehouse"), 800);
  const sameNovaCity = nova.city === city;
  const sameNovaWarehouse = nova.warehouse === warehouse;
  const sameDeliveryCity = delivery?.city === city;
  const sameDeliveryWarehouse = delivery?.warehouse === warehouse;
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (city) {
      if (city.length >= 3 && !(sameNovaCity || sameDeliveryCity)) {
        dispatch(getCities(city));
      }
    } else {
      dispatch(removeCitiesList([]));
    }

    if (warehouse) {
      if (
        warehouse.length >= 1 &&
        !(sameNovaWarehouse || sameDeliveryWarehouse)
      ) {
        dispatch(getWarehouses({ city, warehouse }));
      }
    } else {
      dispatch(removeWarehousesList([]));
    }

    if (isLoggedIn) {
      const { name, email, phone } = user;
      const { city, warehouse } = user.delivery;
      setValue("name", name);
      setValue("email", email);
      setValue("phone", phone);
      setValue("city", city);
      setValue("warehouse", warehouse);
    }
  }, [
    city,
    warehouse,
    dispatch,
    sameNovaCity,
    sameDeliveryCity,
    sameNovaWarehouse,
    sameDeliveryWarehouse,
    isLoggedIn,
    user,
    setValue,
  ]);

  const handleClickCity = (data) => {
    setValue("city", data.city);
    dispatch(removeCitiesList([]));
    dispatch(selectCity(data));
  };

  const handleClickWarehouse = (data) => {
    console.log(data);
    setValue("warehouse", data.Description);
    dispatch(removeWarehousesList([]));
    dispatch(selectWarehouse(data));
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    const newData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      afina: data.delivery,
      city: data.city,
      cityRef: delivery.cityRef || nova.cityRef,
      warehouse: data.warehouse,
      warehouseRef: delivery.warehouseRef || nova.warehouseRef,
      recipientWarehouseIndex:
        delivery.recipientWarehouseIndex || nova.recipientWarehouseIndex,
      payments: data.payments,
      products: busket,
    };

    console.log(newData);

    dispatch(orderProducts(newData));
  });

  return (
    <>
      <FormProvider {...methods}>
        <CustomForm onSubmit={(e) => e.preventDefault()} noValidate>
          <InputsWrapper>
            <Input {...name_input} />
            <Input {...email_input} />
            <Input {...phone_input} />
            <SelectInput {...delivery_select} />
            {deliverySelect === "nova" && (
              <>
                <div>
                  <Input {...city_input} />
                  {cities &&
                    cities.map((item) => {
                      const { Ref, Description } = item;
                      const key = nanoid();
                      return (
                        <div key={key}>
                          <p
                            onClick={() =>
                              handleClickCity({
                                cityRef: Ref,
                                city: Description,
                              })
                            }
                          >
                            {item.Description}
                          </p>
                        </div>
                      );
                    })}
                </div>
                <div>
                  <Input {...warehouse_input} />
                  {warehouse &&
                    warehouses.map((item) => {
                      const { ShortAddress, Ref, WarehouseIndex, Description } =
                        item;
                      const key = nanoid();
                      return (
                        <div key={key}>
                          <p
                            onClick={() =>
                              handleClickWarehouse({
                                ShortAddress,
                                Ref,
                                WarehouseIndex,
                                Description,
                              })
                            }
                          >
                            {Description}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
            <SelectInput {...payments_select} />
          </InputsWrapper>
          <ButtonWrapper>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            <Button onClick={onSubmit}>
              <GrMail />
              Замовити
            </Button>
          </ButtonWrapper>
        </CustomForm>
      </FormProvider>
    </>
  );
}
