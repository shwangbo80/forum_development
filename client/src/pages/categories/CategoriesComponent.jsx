import {React, useEffect, useState} from "react";
import {Row, Col} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";

function CategoriesComponent() {
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

  console.log(categoriesData);

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
          <Col md={2} key={item._id}>
            <Link
              to={`../forums/topic/${item.topicName}`}
              state={{
                id: item._id,
                categoryName: categoriesData[0].categoryName,
              }}>
              {item.topicName}
            </Link>
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
        {categoriesData.sort(categorySort).map((item) => {
          return (
            <div key={item._id}>
              <div className="pb-3">
                <p className="text-dark fw-bold">{item.categoryName}</p>
                <Row>{renderCategoryTopics(item._id)}</Row>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <h2 className="mb-4">Categories</h2>
      {renderCategories()}
    </div>
  );
}

export default CategoriesComponent;