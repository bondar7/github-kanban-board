import {Button} from "react-bootstrap";
import {memo} from "react";

interface ButtonProps {
    isLoading: boolean;
    handleOnLoad: (e: React.MouseEvent) => void;
}

const LoadRepoIssuesButton = ({ isLoading, handleOnLoad }: ButtonProps) => {
    return (
        <Button
            disabled={isLoading}
            className="px-3 text-nowrap"
            style={{ height: "100%", minWidth: "120px" }}
            onClick={handleOnLoad}
        >
            {isLoading ? "Loading..." : "Load Issues"}
        </Button>
    );
};

export default memo(LoadRepoIssuesButton);