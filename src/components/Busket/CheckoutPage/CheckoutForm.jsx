import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GrMail } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
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
import { selectCitiesLoading, selectNovaState, selectWarehousesLoading } from "../../../redux/nova/nova-selectors";
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
import { updateUserDelivery } from "../../../redux/auth/auth-operations";
import { Options, OptionsWrapper } from "../../Auth/UserPage/UserData/DeliveryData";
import { SmallLoader } from "../../SmallLoader/SmallLoader";

export default function CheckoutForm({ user }) {
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
  const dispatch = useDispatch();
  const nova = useSelector(selectNovaState);
  const { cities, warehouses } = nova;
  const busket = useSelector(getBusket);
  const error = useSelector(selectError);
  const { watch, setValue } = methods;
  const deliverySelect = watch("delivery");
  const cityInput = useDebounce(watch("city"), 800);
  const warehouseInput = useDebounce(watch("warehouse"), 800);
  const cityInputt = watch('city');
  const warehouseLoading = useSelector(selectWarehousesLoading);
  const citiesLoading = useSelector(selectCitiesLoading);
  const { isLoggedIn } = useAuth();
  const [userEditDelivery, setUserEditDelivery] = useState(isLoggedIn && delivery.city ? false : true);
  const [showCities, setShowCities] = useState(
    delivery && delivery.city ? false : true
  );

  const [showWarehouses, setShowWarehouses] = useState(
    delivery && delivery.warehouse ? false : true
  );

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
    label: "Місто або селище",
    type: "text",
    id: "city",
    placeholder: "Введіть назву міста або селища...",
    disabled: !userEditDelivery,
  };
  const warehouse_input = {
    name: "warehouse",
    label: "Номер відділення",
    type: "text",
    id: "warehouse",
    placeholder: "Введіть номер відділення...",
    disabled: !userEditDelivery,
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




  useEffect(() => {
    if (cityInput) {
      if(cityInputt.length === 0) {
        return;
      }

      if (cityInput.length > 2 && showCities) {
        dispatch(getCities(cityInput));
      } else {
        dispatch(removeCitiesList([]));
      }
  
      if (warehouseInput.length >= 1 && showWarehouses) {
        dispatch(getWarehouses({ warehouse: warehouseInput, city: cityInput }));
      } else {
        dispatch(removeWarehousesList([]));
      }
    }



    // if (isLoggedIn && !userEditDelivery) {
    //   const { name, email, phone } = user;
    //   const { city, warehouse } = user.delivery;
    //   setValue("name", name);
    //   setValue("email", email);
    //   setValue("phone", phone);
    //   setValue("city", city);
    //   setValue("warehouse", warehouse);
    //   dispatch(removeWarehousesList([]));
    //   dispatch(removeCitiesList([]));
    //   setShowCities(false);
    //   setShowWarehouses(false);
    // }
  }, [
    cityInput,
    warehouseInput,
    dispatch,
    showCities,
    showWarehouses,
    // isLoggedIn,
    // userEditDelivery,
    // user,
    // setValue,
    // delivery,
    cityInputt
  ]);


  const handleClickCity = (data) => {
    setValue("city", data.city);
    setValue("warehouse", "");
    dispatch(removeCitiesList([]));
    dispatch(selectCity(data));
    setShowCities(false);
  };

  const handleClickWarehouse = (data) => {
    console.log(data);
    setValue("warehouse", data.Description);
    dispatch(removeWarehousesList([]));
    dispatch(selectWarehouse(data));
    setShowWarehouses(false);
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    if (isLoggedIn && delivery) {
      const newData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        afina: data.delivery,
        city: data.city,
        cityRef: delivery.cityRef,
        warehouse: data.warehouse,
        warehouseRef: delivery.warehouseRef,
        recipientWarehouseIndex: delivery.recipientWarehouseIndex,
        warehouseAddress: delivery.warehouseAddress,
        payments: data.payments,
        products: busket,
      };
      dispatch(orderProducts(newData));
    } else {
      const newData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        afina: data.delivery,
        city: data.city,
        cityRef: nova.cityRef,
        warehouse: data.warehouse,
        warehouseRef: nova.warehouseRef,
        recipientWarehouseIndex: nova.recipientWarehouseIndex,
        warehouseAddress: nova.warehouseAddress,
        payments: data.payments,
        products: busket,
      };
      dispatch(orderProducts(newData));
    }
  });

  const handleEditButton = () => {
    setUserEditDelivery(true);
    setShowCities(true);
    setShowWarehouses(true);
    setValue("city", "");
    setValue("warehouse", "");
    dispatch(removeCitiesList([]));
    dispatch(removeWarehousesList([]));
  };

  return (
    <>
      <FormProvider {...methods}>
        <CustomForm onSubmit={(e) => e.preventDefault()} noValidate>
          <InputsWrapper>
            <Input {...name_input} />
            <Input {...email_input} />
            <Input {...phone_input} />
            <SelectInput {...payments_select} />
            <SelectInput {...delivery_select} />
            {deliverySelect === "nova" && (
              <div>
                <div>
                    <Input {...city_input} />
                    <OptionsWrapper>
                      {citiesLoading && <SmallLoader />}
                    {cities && userEditDelivery && showCities &&
                      cities.map((item) => {
                        const { Ref, Description } = item;
                        const key = nanoid();
                        return (
                          <Options
                            key={key}
                            onClick={() =>
                              handleClickCity({
                                cityRef: Ref,
                                city: Description,
                              })
                            }
                          >
                            {item.Description}
                          </Options>
                        );
                      })}
                  </OptionsWrapper>
                </div>
                <div>
                    <Input {...warehouse_input} />
                    <OptionsWrapper>
                      {warehouseLoading && <SmallLoader />}
                    {warehouses && userEditDelivery && showWarehouses &&
                      warehouses.map((item) => {
                        const {
                          ShortAddress,
                          Ref,
                          WarehouseIndex,
                          Description,
                        } = item;
                        const key = nanoid();
                        return (
                          <Options
                            key={key}
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
                          </Options>
                        );
                      })}
                  </OptionsWrapper>
                </div>
                {isLoggedIn && (
                  <>
                    {userEditDelivery ? (
                      <Button
                        $small
                        onClick={() => {
                          setUserEditDelivery(false);
                          dispatch(updateUserDelivery(nova));
                        }}
                      >
                        Зберегти адресу доставки
                      </Button>
                    ) : (
                      <Button
                        $small
                        $accent
                        onClick={handleEditButton}
                      >
                        Змінити адресу доставки
                      </Button>
                    )}
                  </>
                )}
              </div>
            )}
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
