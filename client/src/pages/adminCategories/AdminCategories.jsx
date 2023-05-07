import { React, useEffect, useState } from "react";
import { Row, Col, Spinner, Container, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateCategory from "../../components/CreateCategory";
import CreateTopic from "../../components/CreateTopic";
import EditCategory from "../../components/EditCategory";
import EditTopic from "../../components/EditTopic";

function AdminCategories() {
  const [categoryLoaded, setcategoryLoaded] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [categoryTopoicsloaded, setCategoryTopicsLoaded] = useState(false);
  const [categoryTopicsData, setCategoryTopicsData] = useState();

  useEffect(() => {
    fetchCategories();
    fetchCategoryTopics();
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

  function topicSort(a, b) {
    if (a.topicName < b.topicName) {
      return -1;
    }
    if (a.topicName > b.topicName) {
      return 1;
    }
    return 0;
  }

  const fetchCategories = async () => {
    const categories = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}api/category`
    );
    setCategoriesData(categories.data);
    setcategoryLoaded(true);
  };

  const fetchCategoryTopics = async () => {
    const categoryTopics = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}api/topic`
    );
    setCategoryTopicsData(categoryTopics.data);
    setCategoryTopicsLoaded(true);
  };

  const renderCategoryTopics = (id) => {
    if (!categoryTopoicsloaded) {
      return;
    }
    return categoryTopicsData
      .filter((item) => item.categoryId === id)
      .sort(topicSort)
      .map((item) => {
        return (
          <Col className="d-flex" key={item._id}>
            <Link
              className="topicsLink text-darkBlue"
              to={`../forums/topic/${item._id}`}
            >
              {item.topicName}
            </Link>
            <EditTopic
              categoriesData={categoriesData}
              topicData={item}
              fetchCategoryTopics={fetchCategoryTopics}
            />
          </Col>
        );
      });
  };

  const renderCategories = () => {
    if (!categoryLoaded) {
      return;
    }
    return (
      <div>
        <div className="mb-4">
          <h4 className="my-5">Manage Categories and Topics</h4>
          <div className="d-flex">
            <div className="me-3">
              <CreateCategory fetchCategories={fetchCategories} />
            </div>
            <div>
              <CreateTopic
                fetchCategoryTopics={fetchCategoryTopics}
                categoriesData={categoriesData}
              />
            </div>
          </div>
        </div>
        <Row>
          {categoriesData.sort(categorySort).map((item) => {
            return (
              <Col md={6} className="pb-3" key={item._id}>
                <div className="d-flex">
                  <p className="text-dark fw-bold mb-0">{item.categoryName}</p>
                  <EditCategory
                    categoryData={item}
                    fetchCategories={fetchCategories}
                  />
                </div>
                <div>{renderCategoryTopics(item._id)}</div>
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
