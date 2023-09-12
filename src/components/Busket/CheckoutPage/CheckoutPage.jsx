import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderProducts } from "../../../redux/products/products-operation";
import { getBusket } from "../../../redux/products/products-selectors";
import { ButtonWrapper, Button } from "../../Buttons/Buttons";
import {
  Label,
  OrderWrapper,
  ProductsList,
  ProductsItem,
  ProductsItemImage,
  ProductsItemTextWrapper,
  Text,
  Form,
} from "../../Fields/Fields.styled";
import {
  checkoutPageValidation,
  passwordsValidation,
} from "../../../helpers/checkoutPageValidation";
import { Notify } from "notiflix";
import { Inputt } from "./Input";
import { SelectInput } from "./SelectInput";
import CheckoutModal, { CheckoutWrapper } from "./CheckoutModal";
import { register } from "../../../redux/auth/auth-operations";
import { notifyOptions } from "../../../helpers/notifyConfig";
import { selectUser } from "../../../redux/auth/auth-selectors";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router";
import DeliveryData from "../../Auth/UserPage/UserData/DeliveryData";
import { deliveryDataValidation } from "../../../helpers/deliveryDataValidation";
import { selectNovaState } from "../../../redux/nova/nova-selectors";
import styled from 'styled-components';

const BusketWrapper = styled.div`
@media (min-width: 1199px) {
  margin-right: 50px;
}
`;

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const busket = useSelector(getBusket);
  const user = useSelector(selectUser);
  const nova = useSelector(selectNovaState);
  const { isLoggedIn } = useAuth();
  const [willBeRegister, setWillBeRegister] = useState(false);
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
  });

  useEffect(() => {

    if (user.name && user.email && user.phone) {
      setOrderData((prev) => ({
        ...prev,
        email: user.email || "",
        name: user.name || "",
        phone: user.phone || "",
      }));
    }
    // checkBusket();
  }, [user, busket]);

  let elements;
  if (busket) {
    elements = busket.map(({ image, name, price, amount }) => {
      return (
        <ProductsItem key={image}>
          <ProductsItemImage src={image[0]} alt="" />
          <ProductsItemTextWrapper>
            <Text>{name}</Text>
            <Text>{price}</Text>
            <Text>{amount}</Text>
          </ProductsItemTextWrapper>
        </ProductsItem>
      );
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.email) {
      const { delivery } = user;
      await deliveryDataValidation
        .validate(delivery)
        .then()
        .catch((e) => console.log(e));
      const {
        city,
        cityRef,
        warehouse,
        recipientWarehouseIndex,
        warehouseRef,
        warehouseAddress,
      } = delivery;
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
          dispatch(orderProducts(newOrder));
          return;
        }
        dispatch(
          orderProducts({
            ...newOrder,
            name: user.name,
            email: user.email,
            phone: user.phone,
          })
        );
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
          dispatch(orderProducts(newOrder));
          return;
        }
        dispatch(
          orderProducts({
            ...newOrder,
            name: user.name,
            email: user.email,
            phone: user.phone,
          })
        );
      } catch (error) {
        Notify.failure(error.message, notifyOptions);
      }
    }

    if (willBeRegister) {
      try {
        await passwordsValidation.validate({
          email: orderData.email,
          confirmPassword: orderData.confirmPassword,
          password: orderData.password,
        });
        dispatch(
          register({
            email: orderData.email,
            name: orderData.name,
            phone: orderData.phone,
            password: orderData.password,
          })
        ).then((res) => {
          console.log(res);
          if (res.payload.status !== 201) {
            Notify.failure(res.payload.message, {});
          } else {
            Notify.success(
              `На пошту ${res.payload.user.email} було надіслано листа з посиланням для підтвердження профіля!`,
              {
                timeout: 5000,
                pauseOnHover: true,
                success: {
                  background: "#a2d2ff",
                },
              }
            );
          }
        });
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

  if (busket.length < 1) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <OrderWrapper>
        <BusketWrapper>
        <ProductsList>
          <Label>Ваше замовлення:</Label>
          {elements}
        </ProductsList>
        </BusketWrapper>
        <Form checkout onSubmit={handleSubmit}>
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
              <CheckoutModal
                setWillBeRegister={setWillBeRegister}
                willBeRegister={willBeRegister}
                orderData={orderData}
                setOrderData={setOrderData}
              />
            </CheckoutWrapper>
          )}

          <ButtonWrapper>
            <Button type="submit" onSubmit={handleSubmit}>
              {willBeRegister ? "Замовити і зареєструватись" : "Замовити"}
            </Button>
          </ButtonWrapper>
        </Form>
      </OrderWrapper>
    </>
  );
}

// 459
