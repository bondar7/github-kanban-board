import { Container, Card, CardBody } from "react-bootstrap";

const IssueCard = () => {
    return (
        <Container className="d-flex justify-content-center mt-3">
            <Card className="shadow-sm rounded-3 w-100" style={{ maxWidth: "500px" }}>
                <CardBody className="d-flex flex-column gap-2 p-4">
                    <p className="fw-bold fs-5 text-primary">Some issue title</p>
                    <p className="text-muted fs-6">
                        <span className="fw-semibold">#315</span> opened 3 days ago
                    </p>
                    <p className="text-muted fs-6">
                        <span className="fw-semibold">Admin</span> | Comments: 11
                    </p>
                </CardBody>
            </Card>
        </Container>
    );
};

export default IssueCard;
