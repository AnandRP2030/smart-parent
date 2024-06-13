import { Conversation } from "./Conversation";
import { PageLoading } from "../../../../components/pageLoading/pageLoading";
import { useFetchData } from "../../../../hooks/useFetchData";
import { useCustomNavigate } from "../../../../hooks/useCustomNavigate";

const Conversations = () => {
  const { isLoading, data: allParents, error } = useFetchData("/getAllParents");
  const navigateTo = useCustomNavigate();

  return (
    <div className="tw-py-2 tw-flex tw-flex-col tw-overflow-auto">
      {isLoading ? (
        <PageLoading />
      ) : error ? (
        <div className="tw-flex tw-flex-col tw-items-center">
          <p className="tw-text-red-500 tw-font-bold"> {error} </p>
          <button
            className="tw-btn tw-btn-error tw-btn-sm"
            onClick={() => {
              navigateTo("/vc/home");
            }}
          >
            Go Back
          </button>
        </div>
      ) : (
        <div>
          {Array.isArray(allParents) &&
            allParents?.map((parent) => <Conversation parent={parent} />)}
        </div>
      )}
    </div>
  );
};
export default Conversations;
