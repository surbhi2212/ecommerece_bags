import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./styles.css";
import { BsHeart, BsShareFill, BsArrowsFullscreen } from "react-icons/bs";
import Swal from "sweetalert2";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { ADD, ADD_WISHLIST, MOST_VIEW } from "../redux/actions/actions";
import Modal from "react-bootstrap/Modal";
import Zoom from "react-medium-image-zoom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Dropdown from "react-bootstrap/Dropdown";
import { TextField } from "@mui/material";
import "react-medium-image-zoom/dist/styles.css";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const Cards = () => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);
  const [fitem, setFitem] = useState([]);
  const [view, setView] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [subCate, setSubcate] = useState([]);
  const [range, setRange] = useState([]);
  const [visible, setVisible] = useState(9);

  const piece = item.slice(0, visible);

  useEffect(() => {
    category();
  }, []);

  const category = () => {
    axios
      .get(
        "https://564575df-ff51-48b3-af97-3cb6ed776253.mock.pstmn.io/bags/product"
      )
      .then((res) => {
        console.log(res);
        setItem(res.data);
        setFitem(res.data);
        setSubcate(res.data);
        setRange(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadmore = () => {
    setVisible(visible + 6);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );

  function handleShow(e) {
    console.log(e);
    setView(e);
    setFullscreen(e);
    setShow(true);
  }

  const dispatch = useDispatch();

  const send = (e) => {
    console.log(e);
    dispatch(ADD(e));
    // axios.post("https://564575df-ff51-48b3-af97-3cb6ed776253.mock.pstmn.io/add/cart", e)
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Item add to cart",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const sendwish = (e) => {
    dispatch(ADD_WISHLIST(e));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Item add to WishList",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const filterItems = (cateItem) => {
    const updatedItems = fitem.filter((currelement) => {
      return currelement.category === cateItem;
    });
    setItem(updatedItems);
    setSubcate(updatedItems);
    setRange(updatedItems);
  };

  const filterSubItems = (subcateItem) => {
    const updatedSubItems = fitem.filter((currele) => {
      return currele.subcategory === subcateItem;
    });
    setItem(updatedSubItems);
    setRange(updatedSubItems);
  };

  const handleprice = (a, b) => {
    const updateditemprice = range.filter((current) => {
      return current.price >= a && current.price < b;
    });
    setItem(updateditemprice);

    console.log(a);
    console.log(b);
  };
  const newcate = subCate.map((ele) => {
    return ele.subcategory;
  });

  const subcate = [...new Set(newcate)];
  //console.log(subcate)

  const lowtohigh = () => {
    const priceltoh = [...item].sort((a, b) => a.price - b.price);
    setItem(priceltoh);
  };

  const hightolow = () => {
    const pricelhtl = [...item].sort((a, b) => a.price - b.price).reverse();
    setItem(pricelhtl);
  };

  const mostviewed = () => {
    const topview = [...item].sort((a, b) => a.view - b.view);
    setItem(topview);
  };

  return (
    <div>
      <div className="container mt-3">
        <h2
          className="text-center"
          style={{ marginTop: "5rem", fontFamily: "Noto Serif" }}
        >
          All Collections
        </h2>

        <div
          className="category"
          style={{ marginTop: "1rem", marginRight: "0rem" }}
        >
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <h6
              className="shown"
              style={{ fontSize: "18px", marginTop: ".5rem" }}
            >
              Sort By:
            </h6>
            <Dropdown style={{ marginLeft: "1rem", borderRadius: "0px" }}>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Featured
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => hightolow()}>
                  High to Low
                </Dropdown.Item>
                <Dropdown.Item onClick={() => lowtohigh()}>
                  Low to High
                </Dropdown.Item>
                <Dropdown.Item onClick={() => mostviewed()}>
                  Most Viewed
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="row" style={{ width: "100%" }}>
        <div className="col-lg-3 col-md-3" style={{ paddingLeft: "4rem" }}>
          <div className="fixed">
            <div>
              <h4 className="shown">Filter</h4>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <TextField
                  id="standard-search"
                  label="Search"
                  type="search"
                  variant="standard"
                  onChange={(e) => setSearchProduct(e.target.value)}
                />
              </div>
              <h6
                className="shown"
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                Categories
              </h6>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "#000", cursor: "pointer" }}>All</p>
                <Checkbox onClick={() => setItem(fitem)} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "#000", cursor: "pointer" }}>Men</p>
                <Checkbox onClick={() => filterItems("men")} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "#000", cursor: "pointer" }}>Women</p>
                <Checkbox onClick={() => filterItems("women")} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "#000", cursor: "pointer" }}>Kids</p>
                <Checkbox onClick={() => filterItems("kids")} />
              </div>
              <hr />
              <h6
                className="shown"
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                Sub-categories
              </h6>

              {subcate.map((ele) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ color: "#000", cursor: "pointer" }}>{ele}</p>
                      <Checkbox onClick={() => filterSubItems(ele)} />
                    </div>
                  </>
                );
              })}

              <hr />
              <h6
                className="shown"
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                Price
              </h6>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "#000", cursor: "pointer" }}>Below Rs.500</p>
                <Checkbox onClick={() => handleprice(0, 500)} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "#000", cursor: "pointer" }}>
                  {" "}
                  Rs.500 to Rs.700
                </p>
                <Checkbox onClick={() => handleprice(500, 700)} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "#000", cursor: "pointer" }}>
                  {" "}
                  Rs.700 to Rs.900
                </p>
                <Checkbox onClick={() => handleprice(700, 900)} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "#000", cursor: "pointer" }}>
                  {" "}
                  Rs.900 and Above
                </p>
                <Checkbox onClick={() => handleprice(900, 1000)} />
              </div>
              {/* <input type="range" onInput={ handleprice } /> */}
            </div>
          </div>
        </div>

        <div className="col-lg-9 col-md-9 row d-flex justify-content-center align-items-center ">
          {piece
            .filter((value) => {
              if (searchProduct === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(searchProduct.toLowerCase())
              ) {
                return value;
              } else if (
                value.category
                  .toLowerCase()
                  .includes(searchProduct.toLowerCase())
              ) {
                return value;
              }
            })

            .map((element, id) => {
              return (
                <>
                  <Card
                    style={{
                      width: "18rem",
                      border: "none",
                      background: "rgb(230,230,230)",
                    }}
                    className="mx-2 mt-4 card_style"
                  >
                    <Card.Img
                      variant="top"
                      src={element.image}
                      style={{ height: "16rem" }}
                      className="mt-3 style_image"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "16px",
                        width: "20px",
                      }}
                    >
                      <div className="dot">
                        <BsHeart
                          title="wishlist"
                          className="place"
                          onClick={() => sendwish(element)}
                        />
                      </div>

                      <div className="animate__animated animate__fadeInRight sideicon">
                        <div className="dot">
                          <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                          >
                            <BsShareFill className="place" />
                          </OverlayTrigger>
                        </div>

                        <div className="dot">
                          <BsArrowsFullscreen
                            title="full view"
                            className="me-2 mb-2 place"
                            onClick={() => handleShow(element)}
                          />
                        </div>
                      </div>
                    </div>

                    <Card.Body>
                      <div className="button_div d-flex justify-content-center animate__animated animate__fadeInUp">
                        <Button
                          style={{ borderRadius: "0px" }}
                          className="col-lg-12 btnstyle"
                          variant="dark"
                          onClick={() => send(element)}
                        >
                          Add To Cart
                        </Button>
                      </div>

                      <Card.Title
                        style={{ marginTop: "3rem", textAlign: "center" }}
                      >
                        {element.name}
                      </Card.Title>
                      <Card.Text
                        style={{ textAlign: "center", fontWeight: "bold" }}
                      >
                        Rs.{element.price}
                      </Card.Text>
                    </Card.Body>
                  </Card>

                  <Modal
                    show={show}
                    fullscreen={fullscreen}
                    onHide={() => setShow(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>{view.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="container">
                        <div className="row d-flex justify-content-center align-items-center">
                          <div className="col-lg-5 col-md-5 mb-4 mb-lg-0 ">
                            <Zoom>
                              <img
                                src={view.image}
                                alt=""
                                style={{ marginLeft: "-50px" }}
                                width="100%"
                              />
                            </Zoom>
                          </div>

                          <div
                            className="col-lg-7 col-md-7 mb-4 mb-lg-0"
                            style={{ paddingLeft: "2rem" }}
                          >
                            <div className="item">
                              <h4 style={{ fontWeight: "bold" }}>
                                {view.name}
                              </h4>
                            </div>
                            <div style={{ paddingTop: ".5rem" }}>
                              <h5>Code: {view.sku}</h5>
                            </div>
                            <div className="itemdetail">
                              <p>{view.description}</p>
                            </div>

                            <div>
                              <h5>Price: Rs. {view.price}</h5>
                            </div>
                            <div>
                              <Stack spacing={1}>
                                <Rating
                                  name="half-rating-read"
                                  defaultValue={2.5}
                                  precision={0.5}
                                  readOnly
                                />
                              </Stack>
                            </div>
                            <div>
                              <Button
                                style={{
                                  borderRadius: "0px",
                                  marginTop: "2rem",
                                }}
                                variant="dark"
                                className=" btnstyle1"
                                onClick={() => send(view)}
                              >
                                Add To Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </>
              );
            })}
        </div>
      </div>
      <Button
        style={{ borderRadius: "0px", marginLeft: "50%", marginTop: "1rem" }}
        className="col-lg-2 "
        variant="dark"
        onClick={loadmore}
      >
        See More
      </Button>
    </div>
  );
};

export default Cards;
