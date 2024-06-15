import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderProducts } from "../../../redux/products/products-operation";
import { ButtonWrapper, Button } from "../../Buttons/Buttons";
import { OrderWrapper, Form, Text } from "../../Fields/Fields.styled";
import { checkoutPageValidation } from "../../../helpers/checkoutPageValidation";
import { Notify } from "notiflix";
import { Inputt } from "./Input";
import { SelectInput } from "./SelectInput";
import CheckoutModal, { CheckoutWrapper } from "./CheckoutModal";
import { notifyOptions } from "../../../helpers/notifyConfig";
import {
  selectIsUserLoading,
  selectUser,
} from "../../../redux/auth/auth-selectors";
import { useAuth } from "../../../hooks/useAuth";
import DeliveryData from "../../Auth/UserPage/UserData/DeliveryData";
import { deliveryDataValidation } from "../../../helpers/deliveryDataValidation";
import { selectNovaState } from "../../../redux/nova/nova-selectors";
import {
  getBusket,
  getLiqpay,
  selectIsLoading,
} from "../../../redux/products/products-selectors";
import { useNavigate } from "react-router";
import { register } from "../../../redux/auth/auth-operations";
import Loader from "../../Loader/Loader";

export default function CheckoutPage() {
  const user = useSelector(selectUser);
  const busket = useSelector(getBusket);
  const isLiqpay = useSelector(getLiqpay);
  const navigate = useNavigate();
  const isUserLoading = useSelector(selectIsUserLoading);
  const isProductsLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();
  const nova = useSelector(selectNovaState);
  const { isLoggedIn } = useAuth();
  const [orderData, setOrderData] = useState({
    email: "",
    name: "",
    phone: "",
    nova: true,
    afina: false,
    cash: false,
    liqpay: true,
    password: "",
    confirmPassword: "",
    products: busket,
    orderId: "",
  });
  // const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    if (isLiqpay === true) {
      navigate("/payment");
    } else if (isLiqpay === false) {
      navigate("/");
    }

    if (user.name && user.email && user.phone) {
      setOrderData((prev) => ({
        ...prev,
        email: user.email || "",
        name: user.name || "",
        phone: user.phone || "",
      }));
    }
  }, [
    user.name,
    user.email,
    user.phone,
    orderData.liqpay,
    orderData.products,
    isLiqpay,
    navigate,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.delivery) {
      await deliveryDataValidation
        .validate(user.delivery)
        .then()
        .catch((e) => console.log(e));
      const newOrder = {
        ...orderData,
        ...user.delivery,
      };
      try {
        await checkoutPageValidation.validate(newOrder);
        if (
          user.email !== newOrder.email ||
          user.name !== newOrder.name ||
          user.phone !== newOrder.phone
        ) {
          dispatch(orderProducts(newOrder));
        } else {
          dispatch(
            orderProducts({
              ...newOrder,
              name: user.name,
              email: user.email,
              phone: user.phone,
            })
          );
        }
      } catch (error) {
        Notify.failure(error.message, notifyOptions);
      }
    } else {
      await deliveryDataValidation
        .validate(nova)
        .then()
        .catch((e) => console.log(e));
      const {
        city,
        cityRef,
        warehouse,
        recipientWarehouseIndex,
        warehouseRef,
        warehouseAddress,
      } = nova;
      const newOrder = {
        ...orderData,
        city,
        cityRef,
        warehouse,
        recipientWarehouseIndex,
        warehouseRef,
        warehouseAddress,
      };
      try {
        await checkoutPageValidation.validate(newOrder);
        if (
          user.email !== newOrder.email ||
          user.name !== newOrder.name ||
          user.phone !== newOrder.phone
        ) {
          await dispatch(
            register({
              name: orderData.name,
              email: orderData.email,
              phone: orderData.phone,
              password: orderData.password,
            })
          );
          dispatch(orderProducts(newOrder));
        } else {
          await dispatch(
            register({
              name: orderData.name,
              email: orderData.email,
              phone: orderData.phone,
              password: orderData.password,
            })
          );
          dispatch(
            orderProducts({
              ...newOrder,
              name: user.name,
              email: user.email,
              phone: user.phone,
            })
          );
        }
      } catch (error) {
        Notify.failure(error.message, notifyOptions);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "afina":
        return setOrderData((prev) => {
          return {
            ...prev,
            afina: !prev.afina,
            nova: !prev.nova,
          };
        });
      case "nova":
        return setOrderData((prev) => {
          return {
            ...prev,
            nova: !prev.nova,
            afina: !prev.afina,
          };
        });
      case "cash":
        return setOrderData((prev) => {
          return {
            ...prev,
            cash: !prev.cash,
            liqpay: !prev.liqpay,
          };
        });
      case "liqpay":
        return setOrderData((prev) => {
          return {
            ...prev,
            liqpay: !prev.liqpay,
            cash: !prev.cash,
          };
        });
      case name:
        return setOrderData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      default:
        break;
    }
  };

  return (
    <>
      <>{(isUserLoading || isProductsLoading) && <Loader />}</>
      <OrderWrapper>
        <Form $checkout onSubmit={handleSubmit}>
          <Inputt
            name="email"
            type="email"
            label="Ваша пошта:"
            placeholder="youremail@gmail.com"
            onChange={handleChange}
            value={orderData.email}
          />
          <Inputt
            name="name"
            type="text"
            label="Введіть ваше П.І.Б:"
            placeholder="Чепіль Анастасія Олександрівна"
            onChange={handleChange}
            value={orderData.name}
          />
          <Inputt
            name="phone"
            type="phone"
            label="Ваш номер телефону:"
            placeholder="+380963332333"
            onChange={handleChange}
            value={orderData.phone}
          />
          <SelectInput
            text="Доставка:"
            names={["nova", "afina"]}
            type="checkbox"
            onChange={handleChange}
            value={[orderData.nova, orderData.afina]}
            label={["Нова Пошта", "Самовівіз м.Одеса, ТЦ Афіна 4-й поверх"]}
          />
          <DeliveryData user={user} />
          <SelectInput
            text="Оплата:"
            names={["cash", "liqpay"]}
            type="checkbox"
            onChange={handleChange}
            value={[orderData.cash, orderData.liqpay]}
            label={["Накаладений платіж", "Онлайн оплата LiqPay"]}
          />
          {!isLoggedIn && (
            <CheckoutWrapper>
              <Text>
                Щоб завершити замовлення, введіть пароль від вашого особистого
                кабінету:
              </Text>
              <CheckoutModal
                orderData={orderData}
                setOrderData={setOrderData}
              />
            </CheckoutWrapper>
          )}
          <ButtonWrapper>
            <Button type="submit" onClick={handleSubmit}>
              {orderData.liqpay ? "Перейти до оплати" : "Замовити"}
            </Button>
          </ButtonWrapper>
        </Form>
      </OrderWrapper>
    </>
  );
}
