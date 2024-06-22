import { Input } from "../../../Input/Input";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDelivery } from "../../../../redux/auth/auth-operations";
import { yupResolver } from "@hookform/resolvers/yup";
import { deliveryDataSchema } from "../../../../helpers/deliveryDataSchema";
import {
  selectResponse,
  selectError,
} from "../../../../redux/auth/auth-selectors";
import {
  CustomForm,
  InputsWrapper,
  ButtonWrapper,
  Button,
  ErrorMessage,
} from "../../../Form/Form.styled";
import { FaExchangeAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

import {
  getCities,
  getWarehouses,
} from "../../../../redux/nova/nova-operation";

import { selectNovaState } from "../../../../redux/nova/nova-selectors";
import styled from "styled-components";
import { theme } from "../../../../styles/theme";
import {
  removeCitiesList,
  removeWarehousesList,
  selectCity,
  selectWarehouse,
} from "../../../../redux/nova/nova-slice";
import {useAuth} from '../../../../hooks/useAuth';
import useDebounce from "../../../../hooks/useDebounce";

const Options = styled.p`
  padding: 5px 0px;
  width: 100%;
  border: 1px solid ${theme.colors.darkBlue};
  border-radius: 6px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export default function DeliveryData({ user }) {
  const dispatch = useDispatch();
  const { delivery } = user;
  const nova = useSelector(selectNovaState);
  const error = useSelector(selectError);
  const response = useSelector(selectResponse);
  const {isLoggedIn} = useAuth();
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(deliveryDataSchema),
    defaultValues: {
      city: delivery.city,
      warehouse: delivery.warehouse,
    },
  });

  const { watch, setValue } = methods;


  const cityInput = useDebounce(watch("city"), 800);
  const warehouseInput = useDebounce(watch("warehouse"), 800);

  const [userEdit, setUserEdit] = useState(
    cityInput && warehouseInput ? false : true
  );

  const [showCities, setShowCities] = useState(delivery.city ? false : true);

  const [showWarehouses, setShowWarehouses] = useState(
    delivery.warehouse ? false : true
  );

  const { warehouses, cities } = nova;

  const onSubmit = methods.handleSubmit(async (data) => {
    setUserEdit(false);
    dispatch(updateUserDelivery(nova));
  });

  const handleClickCity = (data) => {
    const { Description, Ref } = data;
    dispatch(selectCity({ city: Description, cityRef: Ref }));
    setValue("city", Description);
    setValue("warehouse", '');
    dispatch(removeCitiesList([]));
    setShowCities(false);
  };

  const handleClickWarehouse = (data) => {
    const { ShortAddress, Ref, WarehouseIndex, Description } = data;
    dispatch(
      selectWarehouse({ ShortAddress, Ref, WarehouseIndex, Description })
    );
    setValue("warehouse", Description);
    dispatch(removeWarehousesList([]));
    setShowWarehouses(false);
  };

  useEffect(() => {

    if (cityInput && cityInput.length > 2) {
      dispatch(getCities(cityInput));
    } else {
      dispatch(removeCitiesList([]));
    }

    if (warehouseInput && warehouseInput.length >= 1) {
      dispatch(getWarehouses({ warehouse: warehouseInput, city: cityInput }));
    } else {
      dispatch(removeWarehousesList([]));
    }

  }, [cityInput, warehouseInput, dispatch]);

  const city_input = {
    name: "city",
    label: "Назва міста або селища",
    type: "text",
    id: "city",
    placeholder: "Ведіть назву міста або селища...",
    disabled: !userEdit,
  };

  const warehouse_input = {
    name: "warehouse",
    label: "Номер відділення",
    type: "text",
    id: "warehouse",
    placeholder: "Введіть номер відділення...",
    disabled: !userEdit,
  };

  return (
    <FormProvider {...methods}>
      <CustomForm onSubmit={(e) => e.preventDefault()} noValidate>
        <InputsWrapper>
          <div>
            <Input {...city_input} />
            {cities &&
              userEdit &&
              showCities &&
              cities.map((item) => {
                const { Description, Ref } = item;
                return (
                  <Options key={Ref} onClick={() => handleClickCity(item)}>
                    {Description}
                  </Options>
                );
              })}
          </div>
          <div>
            <Input {...warehouse_input} />
            {warehouses &&
              userEdit &&
              showWarehouses &&
              warehouses.map((item) => {
                const { Description, Ref } = item;
                return (
                  <Options key={Ref} onClick={() => handleClickWarehouse(item)}>
                    {Description}
                  </Options>
                );
              })}
          </div>
        </InputsWrapper>
        {isLoggedIn &&
        <ButtonWrapper>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        {response && <ErrorMessage>Пароль успішно змінено!</ErrorMessage>}
        {userEdit ? (
          <Button onClick={onSubmit}>
            <FaExchangeAlt />
            Зберегти зміни
          </Button>
        ) : (
          <Button $accent
            onClick={(e) => {
              setUserEdit(true);
              setShowCities(true);
              setShowWarehouses(true);
              setValue('city', '')
              setValue('warehouse', '')
            }}
          >
            <FaExchangeAlt />
            Змінити відділення
          </Button>
        )}
      </ButtonWrapper>
        }
        
      </CustomForm>
    </FormProvider>
  );
}
