import { Container, Card, CardBody } from "react-bootstrap";
import styles from "./IssueCard.module.css";
import {Issue} from "../../model/types.ts";

interface IssueCardProps {
    issue: Issue;
}

const IssueCard = ({issue}: IssueCardProps) => {
    return (
        <Container className="d-flex justify-content-center mt-3">
            <Card className={`${styles.card} shadow-sm rounded-3 w-100`} style={{ maxWidth: "500px" }}>
                <CardBody className="d-flex flex-column gap-2 p-4">
                    <p className="fw-bold fs-5 text-primary">{issue.title}</p>
                    <p className="text-muted fs-6">
                        <span className="fw-semibold">#315</span> {issue.createdAt}
                    </p>
                    <p className="text-muted fs-6">
                        <span className="fw-semibold">{issue.author}</span> | Comments: {issue.commentsCount}
                    </p>
                </CardBody>
            </Card>
        </Container>
    );
};

export default IssueCard;
