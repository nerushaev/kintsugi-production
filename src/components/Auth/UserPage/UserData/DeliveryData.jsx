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

import { selectCitiesLoading, selectNovaState, selectWarehousesLoading } from "../../../../redux/nova/nova-selectors";
import styled from "styled-components";
import { theme } from "../../../../styles/theme";
import {
  removeCitiesList,
  removeWarehousesList,
  selectCity,
  selectWarehouse,
} from "../../../../redux/nova/nova-slice";
import { useAuth } from "../../../../hooks/useAuth";
import useDebounce from "../../../../hooks/useDebounce";
import { SmallLoader } from "../../../SmallLoader/SmallLoader";

export const OptionsWrapper = styled.div`
  margin-bottom: 15px;
`;

export const Options = styled.p`
  padding: 5px 0px;
  width: 100%;
  border: 1px solid ${theme.colors.darkBlue};
  // border-radius: 6px;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.ligthGray};
  }
`;

export default function DeliveryData({ user }) {
  const dispatch = useDispatch();
  const { delivery } = user;
  const nova = useSelector(selectNovaState);
  const error = useSelector(selectError);
  const response = useSelector(selectResponse);
  const loadingCities = useSelector(selectCitiesLoading);
  const loadingWarehouses = useSelector(selectWarehousesLoading);
  const { isLoggedIn } = useAuth();

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(deliveryDataSchema),
    defaultValues: {
      city: delivery ? delivery.city : "",
      warehouse: delivery ? delivery.warehouse : "",
    },
  });

  const { watch, setValue } = methods;

  const cityInput = useDebounce(watch("city"), 800);
  const warehouseInput = useDebounce(watch("warehouse"), 800);

  const [userEdit, setUserEdit] = useState(
    cityInput && warehouseInput ? false : true
  );

  const [showCities, setShowCities] = useState(
    delivery && delivery.city ? false : true
  );

  const [showWarehouses, setShowWarehouses] = useState(
    delivery && delivery.warehouse ? false : true
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
    setValue("warehouse", "");
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
    if (cityInput && cityInput.length > 2 && showCities) {
      dispatch(getCities(cityInput));
    } else {
      dispatch(removeCitiesList([]));
    }

    if (warehouseInput && warehouseInput.length >= 1 && showWarehouses) {
      dispatch(getWarehouses({ warehouse: warehouseInput, city: cityInput }));
    } else {
      dispatch(removeWarehousesList([]));
    }
  }, [cityInput, warehouseInput, dispatch, showCities, showWarehouses]);

  const handleEditButton = () => {
    setUserEdit(true);
    setShowCities(true);
    setShowWarehouses(true);
    setValue("city", "");
    setValue("warehouse", "");
    dispatch(removeCitiesList([]));
    dispatch(removeWarehousesList([]));
  };

  const city_input = {
    name: "city",
    label: "Місто або селище",
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
        
            <Input {...city_input} />
            <OptionsWrapper>
              {loadingCities && <SmallLoader />}
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
          </OptionsWrapper>
          
            <Input {...warehouse_input} />
            <OptionsWrapper>
            {loadingWarehouses && <SmallLoader />}
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
          </OptionsWrapper>
        </InputsWrapper>
        {isLoggedIn && (
          <ButtonWrapper>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            {response && <ErrorMessage>Пароль успішно змінено!</ErrorMessage>}
            {userEdit ? (
              <Button onClick={onSubmit}>
                <FaExchangeAlt />
                Зберегти зміни
              </Button>
            ) : (
              <Button
                $accent
                onClick={handleEditButton}>
                <FaExchangeAlt />
                Змінити відділення
              </Button>
            )}
          </ButtonWrapper>
        )}
      </CustomForm>
    </FormProvider>
  );
}
