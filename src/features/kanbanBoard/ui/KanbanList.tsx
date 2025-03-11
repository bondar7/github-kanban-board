import {Issue, IssueState} from "../../../entities/Issue";
import {Card, CardBody, Container} from "react-bootstrap";
import IssueCard from "../../../entities/Issue/ui/issueCard/IssueCard.tsx";

interface KanbanListProps {
    title: IssueState;
    items: Issue[];
}

const KanbanList = ({title, items}: KanbanListProps) => {
    return (
        <Container className="w-100">
            <p className="fw-semibold pb-2 text-center">{title}</p>
            <Card className="shadow-sm rounded-1">
                <CardBody className="d-flex flex-column gap-3 p-3 bg-secondary rounded-1">
                    {items.map((item: Issue) => <IssueCard issue={item}/>)}
                </CardBody>
            </Card>
        </Container>
    );
};

export default KanbanList;