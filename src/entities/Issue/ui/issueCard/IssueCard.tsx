import { Container, Card, CardBody } from "react-bootstrap";
import styles from "./IssueCard.module.css";
import { Issue } from "../../model/types";
import getDaysAgo from "../../../../shared/utils/daysAgo";

interface IssueCardProps {
    issue: Issue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
    const daysAgo = getDaysAgo(issue.created_at);

    const userLogin = issue.assignee?.login || issue.user?.login || 'Unknown User';

    return (
        <Container className="d-flex justify-content-center mt-3">
            <Card className={`${styles.card} shadow-sm rounded-3 w-100`} style={{ maxWidth: "500px" }}>
                <CardBody className="d-flex flex-column gap-2 p-4">
                    <p role="heading" className={`${styles.cardTitle} fw-bold fs-5 text-primary`}>{issue.title}</p>
                    <p className="text-muted fs-6">
                        <span className="fw-semibold">#{issue.number}</span>
                        {` opened ${daysAgo} ${daysAgo === "today" ? "" : daysAgo > 1 ? "days" : "day"} ${daysAgo === "today" ? "" : "ago"}`}
                    </p>
                    <p className="text-muted fs-6">
                        <span
                            className="fw-semibold"
                        >
                            {userLogin}
                        </span> | Comments: {issue.comments}
                    </p>
                </CardBody>
            </Card>
        </Container>
    );
};

export default IssueCard;
