import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, CustomForm, InputsWrapper } from "../../../Form/Form.styled";
import { Input } from "../../../Input/Input";
import { SelectInput } from "../SelectInput";
import {
  Block,
  BlockContent,
  BlockSubTitle,
  CheckoutStepTitle,
  InputsFlexBlock,
  BlockText,
} from "./Steps.styled";
import Checkbox from "../../../Input/Checkbox";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectNovaState } from "../../../../redux/nova/nova-selectors";
import useDebounce from "../../../../hooks/useDebounce";
import {
  getAddress,
  getCities,
  getPostboxes,
  getWarehouses,
} from "../../../../redux/nova/nova-operation";
import { SmallLoader } from "../../../SmallLoader/SmallLoader";
import {
  removeCitiesList,
  removeWarehousesList,
  selectCity,
  selectCityWarehouse,
  selectWarehouse,
  selectPostbox,
  removePostboxesList,
  removeAddressesList,
  selectAddress,
} from "../../../../redux/nova/nova-slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutPageValidationThirdStep } from "../../../../helpers/checkoutPageValidation";
import {
  getBusket,
  selectIsLoading,
} from "../../../../redux/products/products-selectors";
import { orderProducts } from "../../../../redux/products/products-operation";

const CheckboxFlexBlock = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const DynamicListBlock = styled.div`
  margin-bottom: 20px;
`;

const DynamicListItem = styled.p`
  margin-bottom: 10px;
  padding: 5px 0;
  border: 1px solid black;
  border-radius: 6px;
`;

const delivery_select = {
  name: "delivery",
  label: "Спосіб доставки",
  data: [
    { label: "Оберіть спосіб доставки", value: "" },
    { label: "Доставка Новою Поштою", value: "nova" },
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
};
const warehouse_input = {
  name: "warehouse",
  label: "Номер відділення",
  type: "text",
  id: "warehouse",
  placeholder: "Введіть номер відділення...",
};
const postbox_input = {
  name: "postbox",
  label: "Номер почтомату",
  type: "text",
  id: "postbox",
  placeholder: "Введіть номер почтомату...",
};
const address_input = {
  name: "address",
  label: "Адреса",
  type: "text",
  id: "address",
  placeholder: "Введіть вашу адресу",
};
const house_input = {
  name: "house",
  label: "Будинок",
  type: "text",
  id: "house",
  placeholder: "Номер будинку",
};
const appartment_input = {
  name: "appartment",
  label: "Квартира",
  type: "text",
  id: "appartment",
  placeholder: "Номер квартири",
};
const payments_select = {
  name: "payments",
  label: "Спосіб оплати",
  data: [
    { label: "Оберіть спосіб оплати", value: "" },
    { label: "Готівкою при отриманні", value: "cash" },
    { label: "Онлайн оплата MonoPay", value: "card" },
  ],
  id: "payments",
};
const deliveryComments_input = {
  name: "deliveryComments",
  label: "Коментар по доставці",
  type: "textarea",
  id: "deliveryComments",
  placeholder: "",
};
const notCall_checkbox = {
  name: "notCall",
  label: "Не телефонуйте мені",
  type: "checkbox",
  id: "notCall",
  placeholder: "",
};

const warehouseDelivery_checkbox = {
  name: "warehouseDelivery",
  label: "Відділення",
  type: "checkbox",
  id: "warehouseDelivery",
  placeholder: "",
};

const postboxDelivery_checkbox = {
  name: "postboxDelivery",
  label: "Поштомат",
  type: "checkbox",
  id: "postboxDelivery",
  placeholder: "",
};

const addressDelivery_checkbox = {
  name: "addressDelivery",
  label: "Адреса",
  type: "checkbox",
  id: "addressDelivery",
  placeholder: "",
};

export default function ThirdStep({ userData, delivery, setStep3, setStep2 }) {
  const nova = useSelector(selectNovaState);
  const busket = useSelector(getBusket);
  const loading = useSelector(selectIsLoading);

  const dispatch = useDispatch();
  const {
    cities,
    citiesLoading,
    city,
    cityRef,
    warehouseLoading,
    warehouse,
    warehouses,
    cityWarehouse,
    postboxesLoading,
    postboxes,
    postbox,
    address,
    addresses,
    addressLoading,
  } = nova;
  const [showCities, setShowCities] = useState(
    delivery && delivery.city ? false : true
  );
  const [showWarehouses, setShowWarehouses] = useState(
    delivery && delivery.warehouse ? false : true
  );
  const [showPostboxes, setShowPostboxes] = useState(postbox ? false : true);
  const methods = useForm({
    mode: "all",
    defaultValues: {
      delivery: "",
      city: delivery?.city || "",
      warehouse: delivery?.warehouse || "",
      postbox: "",
      payments: "",
      address: "",
      house: "",
      appartment: "",
      deliveryComments: "",
      notCall: false,
      warehouseDelivery: true,
      postboxDelivery: false,
      addressDelivery: false,
    },
    resolver: yupResolver(checkoutPageValidationThirdStep),
  });
  const { watch, setValue } = methods;

  const cityInput = useDebounce(watch("city"), 500);
  const cityInputNow = watch("city");
  const warehouseInput = useDebounce(watch("warehouse"), 500);
  const warehouseInputNow = watch("warehouse");
  const postboxInputNow = watch("postbox");
  const postboxInput = useDebounce(watch("postbox"), 500);
  const addressInputNow = watch("address");
  const addressInput = useDebounce(watch("address"), 500);

  const isMonopay = watch("payments") === "card";
  const isNovaPost = watch("delivery") === "nova";
  const isWarehouseDelivery = watch("warehouseDelivery") === true;
  const isPostboxDelivery = watch("postboxDelivery") === true;
  const isAddressDelivery = watch("addressDelivery") === true;

  useEffect(() => {
    if (cityInputNow?.length === 0) {
      dispatch(removeCitiesList());
      setShowCities(false);
      return;
    }

    if(cityInputNow === delivery.city) {
      dispatch(removeCitiesList());
      setShowCities(false);
      return;
    }

    if (cityInput?.length >= 2 && city !== cityInputNow) {
      setShowCities(true);
      dispatch(getCities(cityInput));
    }
  }, [cityInput, cityInputNow, city, dispatch, delivery.city]);

  useEffect(() => {
    if (warehouseInputNow?.length === 0) {
      dispatch(removeWarehousesList());
      setShowWarehouses(false);
      return;
    }

    if(warehouseInputNow === delivery.warehouse) {
      dispatch(removeWarehousesList());
      setShowWarehouses(false);
      return;
    }

    if (warehouseInput?.length >= 1 && warehouse !== warehouseInputNow) {
      setShowWarehouses(true);
      dispatch(
        getWarehouses({ city: cityWarehouse, warehouse: warehouseInput })
      );
    }
  }, [warehouseInput, warehouseInputNow, warehouse, dispatch, cityWarehouse, delivery.warehouse]);

  useEffect(() => {
    if (postboxInputNow?.length === 0 || postboxInput === postbox) {
      dispatch(removeWarehousesList());
      setShowPostboxes(false);
      return;
    }

    if (postboxInput?.length >= 2 && postbox !== postboxInputNow) {
      setShowPostboxes(true);
      dispatch(getPostboxes({ city: cityWarehouse, postbox: postboxInput }));
    }
  }, [postboxInput, postboxInputNow, postbox, dispatch, cityWarehouse]);

  useEffect(() => {
    if (addressInputNow?.length === 0 || addressInput === address) {
      dispatch(removeWarehousesList());
      setShowPostboxes(false);
      return;
    }

    if (addressInput?.length >= 2 && address !== addressInputNow) {
      setShowPostboxes(true);
      dispatch(getAddress({ ref: cityRef, street: addressInput }));
    }
  }, [addressInput, addressInputNow, address, dispatch, cityRef]);



  const handleBack = () => {
    setStep2(true);
    setStep3(false);
  };

  const handleNovaCheckbox = (e) => {
    const { name } = e.target;
    console.log(name);

    switch (name) {
      case "warehouseDelivery":
        setValue("warehouseDelivery", true);
        setValue("postboxDelivery", false);
        setValue("addressDelivery", false);
        break;
      case "postboxDelivery":
        setValue("warehouseDelivery", false);
        setValue("postboxDelivery", true);
        setValue("addressDelivery", false);
        break;
      case "addressDelivery":
        setValue("warehouseDelivery", false);
        setValue("postboxDelivery", false);
        setValue("addressDelivery", true);
        break;
      default:
        break;
    }
  };

  const handleCityClick = (item) => {
    setValue("city", item.Present);
    dispatch(selectCity({ city: item.Present, cityRef: item.Ref }));
    dispatch(selectCityWarehouse(item.MainDescription));
    dispatch(removeCitiesList());
    setShowCities(false);
  };

  const handleWarehouseClick = (item) => {
    setValue("warehouse", item.Description);
    dispatch(selectWarehouse(item));
    dispatch(removeWarehousesList());
    setShowWarehouses(false);
  };

  const handlePostboxClick = (item) => {
    setValue("postbox", item.Description);
    dispatch(selectPostbox(item.Description));
    dispatch(removePostboxesList());
    setShowPostboxes(false);
  };

  const handleAddressClick = (item) => {
    setValue("address", item.Present);
    dispatch(selectAddress(item.Present));
    dispatch(removeAddressesList());
    // setShowPostboxes(false);
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    const finalData = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      city: data.city,
      warehouse: data.warehouse,
      postbox: data.postbox,
      address: {
        address: data.address,
        house: data.house,
        appartment: data.appartment,
      },
      payments: data.payments,
      warehouseDelivery: data.warehouseDelivery,
      postboxDelivery: data.postboxDelivery,
      addressDelivery: data.addressDelivery,
      notCall: data.notCall,
      products: busket,
      delivery: data.delivery,
    };
    dispatch(orderProducts(finalData));
  });

  return (
    <>
      <CheckoutStepTitle>Дані користувача</CheckoutStepTitle>
      <Block style={{ display: "block" }}>
        <Button
          style={{
            marginLeft: "20px",
            marginRight: "auto",
            padding: "5px 10px",
            marginBottom: "20px",
          }}
          onClick={handleBack}
        >
          Попередня сторінка
        </Button>
        {/* <BlockTitle>Заповніть свої персональні дані </BlockTitle> */}
        <FormProvider {...methods}>
          <CustomForm style={{ marginBottom: "0" }}>
            <InputsFlexBlock>
              <BlockContent>
                <BlockSubTitle style={{ marginBottom: "30px" }}>
                  Доставка
                </BlockSubTitle>
                <InputsWrapper>
                  <SelectInput {...delivery_select} />
                  {isNovaPost && (
                    <>
                      <CheckboxFlexBlock onClick={(e) => handleNovaCheckbox(e)}>
                        <Checkbox {...warehouseDelivery_checkbox} />
                        <Checkbox {...postboxDelivery_checkbox} />
                        <Checkbox {...addressDelivery_checkbox} />
                      </CheckboxFlexBlock>
                      <Input {...city_input} />
                      <DynamicListBlock>
                        <>
                          {citiesLoading && <SmallLoader />}
                          {cities &&
                            showCities &&
                            cities.map((item) => {
                              return (
                                <DynamicListItem
                                  key={item.Present}
                                  onClick={() => handleCityClick(item)}
                                >
                                  {item.Present}
                                </DynamicListItem>
                              );
                            })}
                        </>
                      </DynamicListBlock>
                      {isWarehouseDelivery && (
                        <>
                          <Input {...warehouse_input} />
                          <DynamicListBlock>
                            {warehouseLoading && <SmallLoader />}
                            {warehouses &&
                              showWarehouses &&
                              warehouses.map((item) => {
                                return (
                                  <DynamicListItem
                                    key={item.Description}
                                    onClick={() => handleWarehouseClick(item)}
                                  >
                                    {item.Description}
                                  </DynamicListItem>
                                );
                              })}
                          </DynamicListBlock>
                        </>
                      )}
                      {isPostboxDelivery && (
                        <>
                          <Input {...postbox_input} />
                          <DynamicListBlock>
                            {postboxesLoading && <SmallLoader />}
                            {postboxes &&
                              showPostboxes &&
                              postboxes.map((item) => {
                                return (
                                  <DynamicListItem
                                    key={item.Description}
                                    onClick={() => handlePostboxClick(item)}
                                  >
                                    {item.Description}
                                  </DynamicListItem>
                                );
                              })}
                          </DynamicListBlock>
                        </>
                      )}
                      {isAddressDelivery && (
                        <>
                          <Input {...address_input} />
                          <DynamicListBlock>
                            {addressLoading && <SmallLoader />}
                            {addresses &&
                              addresses.map((item) => {
                                return (
                                  <DynamicListItem
                                    key={item.Description}
                                    onClick={() => handleAddressClick(item)}
                                  >
                                    {item.Present}
                                  </DynamicListItem>
                                );
                              })}
                          </DynamicListBlock>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <Input {...house_input} />
                            <Input {...appartment_input} />
                          </div>
                        </>
                      )}
                    </>
                  )}
                  <Input {...deliveryComments_input} />
                </InputsWrapper>
              </BlockContent>
              <BlockContent>
                <BlockSubTitle style={{ marginBottom: "30px" }}>
                  Оплата
                </BlockSubTitle>
                <InputsWrapper>
                  <SelectInput {...payments_select} />
                  {isMonopay && (
                    <>
                      <BlockText>
                        Після завершення замовлення ви будете переадресовані на
                        сторінку оплати.
                      </BlockText>
                      <Checkbox {...notCall_checkbox} />
                    </>
                  )}
                </InputsWrapper>
              </BlockContent>
            </InputsFlexBlock>
            <Button style={{width: "140px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center"}} onClick={onSubmit}>
              {loading ? <SmallLoader /> : "Перейти далі"}
            </Button>
          </CustomForm>
        </FormProvider>
      </Block>
    </>
  );
}
