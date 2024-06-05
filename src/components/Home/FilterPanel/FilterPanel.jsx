import React, { useEffect, useRef, useState } from "react";
import {
  FilterPanelWrapper,
  FilterBtn,
  PriceFilterWrapper,
  PriceBtn,
  FilterIcon,
  Section,
} from "./FilterPanel.styled";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../redux/filter/filter-slice";
import svg from "../../../assets/filterIcons.svg";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

const Box = styled.div`

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: opacity 200ms cubic-bezier(.17,.67,.83,.67);
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: opacity 200ms cubic-bezier(.17,.67,.83,.67);
  }
}`;

const initialState = {
    wigs: false,
    costume: false,
    accessories: false,
    smallStand: false,
    bigStand: false,
    pendant: false,
    pin: false,
    hairpins: false,
    earrings: false,
    tapestries: false,
    other: false,
}

export default function FilterPanel({getObjectKeysString}) {
  const dispatch = useDispatch();
  //общий стейт
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category')

  function makeObjectFromUrl (urls) {
    if(!urls) {
      return initialState;
    }
    const categoryUrl = {};
    const urlsArray = urls.split(',')
    urlsArray.pop();
      for (const key of urlsArray) {
        categoryUrl[key] = true;
      } 
    return categoryUrl;
  }

  const result = makeObjectFromUrl(category);


  const [filters, setFilters] = useState({
    wigs: result.wigs || false,
    costume: result.costume || false,
    accessories: result.accessories || false,
    smallStand: result.smallStand || false,
    bigStand: result.bigStand || false,
    pendant: result.pendant || false,
    pin: result.pin || false,
    hairpins: result.hairpins || false,
    earrings: result.earrings || false,
    tapestries: result.tapestries || false,
    other: result.other || false,
    low: result.low || false,
    high: result.high || false,
  });
  //стейт для кнопки "Сортировать по цене"
  const [priceFilter, setPriceFilter] = useState(false);
  //стейт для кнопки "Фильтр"
  const [allFilter, setAllFilter] = useState(category ? true :false);


  const nodeRef = useRef(null);

  useEffect(() => {

      const result = getObjectKeysString(filters);
      if(result === category) {
        return;
      } else {
        searchParams.set('category', result);
        setSearchParams(searchParams);
      }

      dispatch(setFilter(filters));
  }, [filters, dispatch, getObjectKeysString, searchParams, setSearchParams, category]);

  const filterButtonsClick = (e) => {
    const { id } = e.target;
    switch (id) {
      case "price":
        setPriceFilter(!priceFilter);
        if (allFilter) {
          setAllFilter(false);
        }
        return;
      case "filter":
        setAllFilter(!allFilter);
        if (priceFilter) {
          setPriceFilter(false);
        }
        return;
      default:
        return;
    }
  };

  const handleAllFilter = (e) => {
    const { id } = e.target;
    if (id === "low" && filters.high) {
      setFilters((prev) => {
        return {
          ...prev,
          low: true,
          high: false,
        };
      });
      searchParams.set('page', 1);
      setSearchParams(searchParams);
      return;
    } else if (id === "high" && filters.low) {
      setFilters((prev) => {
        return {
          ...prev,
          low: false,
          high: true,
        };
      });
      searchParams.set('page', 1);
      setSearchParams(searchParams);
    } else {
      setFilters((prev) => {
        return {
          ...prev,
          [id]: !prev[id],
        };
      });
      searchParams.set('page', 1);
      setSearchParams(searchParams);
    }
  };

  let Child = undefined;
  if (priceFilter) {
    Child = (
      <PriceFilterWrapper onClick={handleAllFilter}>
        <PriceBtn id="low" $active={filters.low}>
          По-зростанню
        </PriceBtn>
        <PriceBtn id="high" $active={filters.high}>
          По-зменьшенню
        </PriceBtn>
      </PriceFilterWrapper>
    );
  } else if (allFilter) {
    Child = (
      <PriceFilterWrapper $allFilter onClick={handleAllFilter}>
        <PriceBtn $active={filters.wigs} id="wigs">
          Перука
        </PriceBtn>
        <PriceBtn $active={filters.costume} id="costume">
          Костюм
        </PriceBtn>
        <PriceBtn $active={filters.accessories} id="accessories">
          Аксессуар
        </PriceBtn>
        <PriceBtn $active={filters.smallStand} id="smallStand">
          Маленький стенд
        </PriceBtn>
        <PriceBtn $active={filters.bigStand} id="bigStand">
          Великий стенд
        </PriceBtn>
        <PriceBtn $active={filters.pendant} id="pendant">
          Кулон
        </PriceBtn>
        <PriceBtn $active={filters.pin} id="pin">
          Пін
        </PriceBtn>
        <PriceBtn $active={filters.hairpins} id="hairpins">
          Шпилька
        </PriceBtn>
        <PriceBtn $active={filters.earrings} id="earrings">
          Сережки
        </PriceBtn>
        <PriceBtn $active={filters.tapestries} id="tapestries">
          Гобелен
        </PriceBtn>
        <PriceBtn $active={filters.other} id="other">
          Інше
        </PriceBtn>
      </PriceFilterWrapper>
    );
  }

  return (
    <Section>
      <FilterPanelWrapper onClick={filterButtonsClick} $allFilter={allFilter}>
        <FilterBtn id="price" $active={priceFilter}>
          Сортувати за ціною
          <FilterIcon id="price" width="18" height="18">
            <use xlinkHref={`${svg}#icon-price`}></use>
          </FilterIcon>
        </FilterBtn>
        <FilterBtn id="filter" filter="true" $active={allFilter}>
          Фільтр
          <FilterIcon id="filter" width="18" height="18">
            <use xlinkHref={`${svg}#icon-filter`}></use>
          </FilterIcon>
        </FilterBtn>
      </FilterPanelWrapper>
      <SwitchTransition>
        <CSSTransition
          key={priceFilter || allFilter ? "Price Filter" : "All Filter"}
          classNames="fade"
          nodeRef={nodeRef}
          timeout={200}
        >
          {() => <Box ref={nodeRef}>{Child}</Box>}
        </CSSTransition>
      </SwitchTransition>
    </Section>
  );
}
