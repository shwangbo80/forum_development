import { React, useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminCategories() {
  const [loaded, setLoaded] = useState(false);
  const [categoriesData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function categorySort(a, b) {
    if (a.categoryName < b.categoryName) {
      return -1;
    }
    if (a.categoryName > b.categoryName) {
      return 1;
    }
    return 0;
  }

  const fetchCategories = async () => {
    const categories = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}api/category`
    );
    setCategoryData(categories.data);
    setLoaded(true);
  };

  const renderCategories = () => {
    if (!loaded) {
      return;
    }

    return (
      <div>
        <Row>
          {categoriesData.sort(categorySort).map((item) => {
            return (
              <Col md={6} key={item._id}>
                <div className="pb-3">
                  <Link
                    to={`../../admin/editcategory/${item._id}`}
                    className="text-dark fw-bold"
                  >
                    {item.categoryName}
                  </Link>
                  <p>{item.categoryDescription}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  };

  return <div>{renderCategories()}</div>;
}

export default AdminCategories;
