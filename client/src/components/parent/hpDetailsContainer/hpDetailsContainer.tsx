import { FC, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { HealthProfessionalData } from "../../../types/userTypes";
import { IllustrationSection } from "../../common/illustration/illustration";
import { useProfilePicture } from "../../../hooks/useProfilePicture";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../apis/axiosInstance";
interface HPDetailsContainerProps {
  data: HealthProfessionalData;
}

interface ParentHPIds {
  parentId: string;
  healthProfessionalId: string;
}

export const HPDetailsContainer: FC<HPDetailsContainerProps> = ({ data }) => {
  const [parentHpIds, setParentHpIds] = useState<ParentHPIds>({
    parentId: "",
    healthProfessionalId: "",
  });
  console.log('pa', parentHpIds)
  const [subscribed, setSubscribed] = useState(false);
  const { userType, userId } = useSelector((state: RootState) => state.user);
  const { id: healthProfessionalId } = useParams();

  const getSubscriptionStatus = async (
    parentId: string,
    healthProfessionalId: string
  ) => {
    try {
      const res = await axiosInstance.post("getSubscriptionStatus", {
        parentId,
        healthProfessionalId,
      });

      if (res.status === 200) {
        setSubscribed(res.data?.suscriptionStatus);
      } else {
        toast.error("Couldn't get subscription status");
      }
    } catch (error) {
      console.log("Couldn't get subscription status", error);
    }
  };
  useEffect(() => {
    if (userType === "parent" && userId && healthProfessionalId) {
      setParentHpIds({
        parentId: userId,
        healthProfessionalId,
      });

      getSubscriptionStatus(userId, healthProfessionalId);
    } else {
      toast.error("Please login again");
      navigate("/parent/view-hp");
    }
  }, []);

  const { profilePicture } = useProfilePicture(data?.profilePicture?.filename);
  const navigate = useNavigate();
  const redirectToPaymentPage = (id: string) => {
    navigate(`/parent/payment/${id}`);
  };

  return (
    <Container className="mt-5">
      <h3 className="text-center text-primary shadow">Health Professional</h3>
      <Row>
        <Col md={4}>
          <IllustrationSection imgPath="https://img.freepik.com/free-vector/health-professional-team-concept-illustration_114360-1618.jpg" />
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-center align-items-center">
                <Image
                  style={{ width: "100px", height: "100px" }}
                  rounded
                  src={profilePicture}
                />
              </div>
              <div className="shadow p-2" style={{ minHeight: "300px" }}>
                <Card.Title className="mt-3 text-center">
                  Name: {data.name}
                </Card.Title>
                <Card.Text className='mt-5'>
                  <Row>
                    <Col>
                      <p>
                        {" "}
                        <strong>Email:</strong> {data.email} <br />
                      </p>
                      <p>
                        <strong>Phone Number:</strong> {data.phoneNumber} <br />
                      </p>
                      <p>
                        <strong>Address:</strong> {data.address} <br />
                      </p>
                    </Col>
                    <Col>
                      
                      <p>
                        <strong>Category:</strong> {data.category} <br />
                      </p>
                      <p>
                        <strong>Department:</strong> {data.department} <br />
                      </p>
                    </Col>
                  </Row>
                </Card.Text>
                <div className="d-flex justify-content-center">
                  {subscribed ? (
                    <h5 className="text-success">Subscribed</h5>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => {
                        redirectToPaymentPage(data._id);
                      }}
                    >
                      Subscribe
                    </Button>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
