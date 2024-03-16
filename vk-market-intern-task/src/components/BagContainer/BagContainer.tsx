import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  calculateTotals,
  deleteAllBagItems,
  fetchBagItems,
} from "../../state/bag/bagSlice";
import BagProduct from "../BagProduct/BagProduct";
import { RootState } from "../../state/store";

const BagContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBagItems());
  }, [dispatch]);

  const { items, amount, total, isLoading } = useSelector((state: RootState) => state.bag);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [items]);

  if (isLoading) {
    return (
        <h1>Loading...</h1>
    )
  }

  if (amount < 1) {
    return (
      <section>
        <div>
          <h2>Oops...</h2>
          <p>Your bag is empty</p>
        </div>
      </section>
    );
  }

  return (
    <div>
      {items.map((item) => (
        <BagProduct key={item.id} item={item} />
      ))}
      <p>total - {total}$</p>
      <button onClick={() => dispatch(deleteAllBagItems())}>delete</button>
    </div>
  );
};

export default BagContainer;
