import { useSelector, useDispatch } from "react-redux";

const useLoading = () => {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const loadingAction = () => {
    dispatch({ type: "LOADING" });
  };
  const doneAction = () => {
    dispatch({ type: "DONE" });
  };

  return { loading, loadingAction, doneAction };
};

export default useLoading;
