import "./bag.css"
import { useEffect, useState } from 'react'
import { GetAddBag } from "../../slices/AddBagSlice";
import { clearAddBag } from "../../slices/AddBagSlice";
import { useDispatch, useSelector } from "react-redux";
import { GetAddBagColect } from "../../slices/AddBagColectSlice";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

export default function Bag() {

  const addbagcolection = useSelector(state => state.addbagcolect.addbagcolect)
  const addbag = useSelector(state => state.addbag.addbag)
  const dispatch = useDispatch()
  const totalOrderPrice = addbag.reduce((total, item) => total + item.countId * item.charmPrice, 0);
  let totalSum = 0;

  const handleRemoveAlls = () => {
    dispatch(clearAddBag());
  };

  const handleDecrementBelt = (id, beltId, beltCount) => {
    if (beltCount <= 1) {
      axios.get(`http://localhost:3004/addbagcolect/${id}`)
        .then(response => {
          const existingData = response.data;
          const updatedCollection = existingData.arrBelt.map(collectionItem => {
            if (collectionItem.beltId === beltId) {
              return {
                ...collectionItem,
                beltCount: 1
              };
            }
            return collectionItem;
          });
          const updatedData = {
            ...existingData,
            arrBelt: updatedCollection
          };
          axios.patch(`http://localhost:3004/addbagcolect/${id}`, updatedData)
            .then(() => {
              dispatch(GetAddBagColect());
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios.get(`http://localhost:3004/addbagcolect/${id}`)
        .then(response => {
          const existingData = response.data;
          const updatedCollection = existingData.arrBelt.map(collectionItem => {
            if (collectionItem.beltId === beltId) {
              return {
                ...collectionItem,
                beltCount: beltCount - 1
              };
            }
            return collectionItem;
          });
          const updatedData = {
            ...existingData,
            arrBelt: updatedCollection
          };
          axios.patch(`http://localhost:3004/addbagcolect/${id}`, updatedData)
            .then(() => {
              dispatch(GetAddBagColect());
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleDecrementBeltItem = (id, onlyBeltId, countId) => {
    if (countId <= 1) {
      axios.get(`http://localhost:3004/addbagcolect/${id}`)
        .then(response => {
          const existingData = response.data;
          const updatedCollection = existingData.arrBelt.map(collectionItem => {
            if (collectionItem.onlyBeltId === onlyBeltId) {
              return {
                ...collectionItem,
                countId: 1
              };
            }
            return collectionItem;
          });
          const updatedData = {
            ...existingData,
            arrBelt: updatedCollection
          };
          axios.patch(`http://localhost:3004/addbagcolect/${id}`, updatedData)
            .then(() => {
              dispatch(GetAddBagColect());
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios.get(`http://localhost:3004/addbagcolect/${id}`)
        .then(response => {
          const existingData = response.data;
          const updatedCollection = existingData.arrBelt.map(collectionItem => {
            if (collectionItem.onlyBeltId === onlyBeltId) {
              return {
                ...collectionItem,
                countId: countId - 1
              };
            }
            return collectionItem;
          });
          const updatedData = {
            ...existingData,
            arrBelt: updatedCollection
          };
          axios.patch(`http://localhost:3004/addbagcolect/${id}`, updatedData)
            .then(() => {
              dispatch(GetAddBagColect());
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleIncrementBeltItem = (id, onlyBeltId, countId) => {
    axios.get(`http://localhost:3004/addbagcolect/${id}`)
      .then(response => {
        const existingData = response.data;
        const updatedCollection = existingData.arrBelt.map(collectionItem => {
          if (collectionItem.beltId === onlyBeltId) {
            return {
              ...collectionItem,
              beltCount: countId + 1
            };
          }
          return collectionItem;
        });
        const updatedData = {
          ...existingData,
          arrBelt: updatedCollection
        };
        axios.patch(`http://localhost:3004/addbagcolect/${id}`, updatedData)
          .then(() => {
            dispatch(GetAddBagColect());
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleIncrementBelt = (id, beltId, beltCount) => {
    axios.get(`http://localhost:3004/addbagcolect/${id}`)
      .then(response => {
        const existingData = response.data;
        const updatedCollection = existingData.arrBelt.map(collectionItem => {
          if (collectionItem.beltId === beltId) {
            return {
              ...collectionItem,
              beltCount: beltCount + 1
            };
          }
          return collectionItem;
        });
        const updatedData = {
          ...existingData,
          arrBelt: updatedCollection
        };
        axios.patch(`http://localhost:3004/addbagcolect/${id}`, updatedData)
          .then(() => {
            dispatch(GetAddBagColect());
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    dispatch(GetAddBag())
    dispatch(GetAddBagColect())
  }, [])

  return (
    <>
      <div className="bag-parent-box">
        <div className="my-bag-box">
          <div className="my-bag-box-transparent">
            <div className="bag-item-box">

              {/* addbagcolection Maping */}
              {addbagcolection.length > 0 ? (<div className="bag-item-parent-box2">
                {addbagcolection.map(({ id, onlyBeltId, addBeltColor, arrBelt, countId, AddpriceBelt }) => {
                  totalSum += AddpriceBelt;
                  totalSum *= countId;
                  return (
                    <div
                      key={id}
                      className="belt-bag-parent-box">
                      <div
                        className="removeAll"
                        onClick={() => {
                          axios.delete("http://localhost:3004/addbagcolect/" + id).then(() => {
                            dispatch(GetAddBagColect())
                          })
                        }}>
                        <CloseIcon />
                      </div>
                      <div className="belt-collect-box">
                        <div className="bag-delete">
                          <div
                            onClick={() => {
                              axios.delete("http://localhost:3004/addbagcolect/" + id).then(() => {
                                dispatch(GetAddBagColect())
                              })
                            }}
                            className="bag-delete-box-click">
                            <DeleteForeverIcon
                              className="icon-delete" />
                          </div>
                        </div>
                        <div className="belt-image-box2">
                          <img
                            className="belt-image-box2-image"
                            src="./assets/Rectangle 633.png" />
                        </div>
                        <div className="belt-image-box-text">
                          <p className="belt-image-box-text-top">Custom Name Braclet</p>
                          <p className="belt-image-box-text-bottom">Size 25X10 | Width 25X10</p>
                        </div>
                        <div className="belt-color-box">
                          <div className="belt-color-circle" style={{ backgroundColor: addBeltColor }}>
                          </div>
                        </div>
                        <div className="bag-add-count1">
                          <div className="counter-box">
                            <div className="count-circle"
                              onClick={() => handleIncrementBeltItem(id, onlyBeltId, countId)}
                            >-</div>
                            <p>{countId}</p>
                            <div className="count-circle"
                              onClick={() => handleDecrementBeltItem(id, onlyBeltId, countId)}
                            >+</div>
                          </div>
                        </div>
                        <div className="bag-belt-price">
                          <p>{AddpriceBelt}.00 $</p>
                        </div>
                      </div>
                      {
                        arrBelt.map((belt) => {
                          totalSum += belt.beltPreic * belt.beltCount
                          return (
                            <div
                              key={belt.id}
                              className="item-box-adding">
                              <div className="bag-delete">
                                <div
                                  className="bag-delete-box-click">
                                  <DeleteForeverIcon
                                    className="icon-delete" />
                                </div>
                              </div>
                              <div className="bag-add-img">
                                <img
                                  className="bag-add-image"
                                  src={belt.beltImg}
                                />
                              </div>
                              <div className="bag-add-name">
                                <p>{belt.beltName}</p>
                              </div>
                              <div className="bag-add-color">
                                <div className="collection-item-top-choose-circles1">
                                  <div className="choose-circles"
                                  ></div>
                                  <div className="choose-circles"
                                  ></div>
                                  <div className="choose-circles"
                                  ></div>
                                </div>
                              </div>
                              <div className="bag-add-count">
                                <div className="counter-box">
                                  <div className="count-circle"
                                    onClick={() => handleDecrementBelt(id, belt.beltId, belt.beltCount)}
                                  >-</div>
                                  <p>{belt.beltCount}</p>
                                  <div className="count-circle"
                                    onClick={() => handleIncrementBelt(id, belt.beltId, belt.beltCount)}
                                  >+</div>
                                </div>
                              </div>
                              <div className="bag-add-pric-one">
                                <p>{belt.beltPreic}.00$</p>
                              </div>
                              <div className="bag-add-price-count">
                                <p>{belt.beltPreic}.00 $</p>
                              </div>
                            </div>
                          )
                        })
                      }
                      <div className="orderPriceBox">
                        <div className="orderPriceBoxleft">
                          <a className="link-to-add-product" href="#">Add product</a>
                        </div>
                        <div className="orderPriceBoxright">
                          <div className="orderPriceBoxright2">
                            <p>Order price: <span>{totalSum}.00 $</span></p>
                            <button>ORDER</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>) : undefined}


              {addbag.length > 0 ? (<div className="bag-item-parent-box1">
                {addbag.map(({ id, charmName, charmPrice, charmImg, setLetColor, countId }) => {
                  return (
                    <div
                      key={id}
                      className="item-box-adding">
                      <div
                        className="removeAll"
                        onClick={handleRemoveAlls}>
                        <CloseIcon />
                      </div>
                      <div className="bag-delete">
                        <div
                          onClick={() => {
                            axios.delete("http://localhost:3004/addbag/" + id).then(() => {
                              dispatch(GetAddBag())
                            })
                          }}
                          className="bag-delete-box-click">
                          <DeleteForeverIcon
                            className="icon-delete" />
                        </div>
                      </div>
                      <div className="bag-add-img">
                        <img
                          className="bag-add-image"
                          src={charmImg}
                          style={{ filter: setLetColor }}
                        />
                      </div>
                      <div className="bag-add-name">
                        <p>{charmName}</p>
                      </div>
                      <div className="bag-add-color">
                        <div className="collection-item-top-choose-circles1">
                          <div className="choose-circles"
                            onClick={() => {
                              axios.patch("http://localhost:3004/addbag/" + id, { setLetColor: "grayscale(30%)" }).then(() => {
                                dispatch(GetAddBag())
                              })
                            }}
                          ></div>
                          <div className="choose-circles"
                            onClick={() => {
                              axios.patch("http://localhost:3004/addbag/" + id, { setLetColor: "grayscale(0)" }).then(() => {
                                dispatch(GetAddBag())
                              })
                            }}
                          ></div>
                          <div className="choose-circles"
                            onClick={() => {
                              axios.patch("http://localhost:3004/addbag/" + id, { setLetColor: "grayscale(1)" }).then(() => {
                                dispatch(GetAddBag())
                              })
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="bag-add-count">
                        <div className="counter-box">
                          <div className="count-circle"
                            onClick={() => {
                              if (countId > 1) {
                                axios.patch("http://localhost:3004/addbag/" + id, { countId: countId - 1 }).then(() => {
                                  dispatch(GetAddBag())
                                })
                              }
                            }}
                          >-</div>
                          <p>{countId}</p>
                          <div className="count-circle"
                            onClick={() => {
                              if (countId) {
                                axios.patch("http://localhost:3004/addbag/" + id, { countId: countId + 1 }).then(() => {
                                  dispatch(GetAddBag())
                                })
                              }
                            }}
                          >+</div>
                        </div>
                      </div>
                      <div className="bag-add-pric-one">
                        <p>{charmPrice}.00$</p>
                      </div>
                      <div className="bag-add-price-count">
                        <p>{countId * charmPrice}.00 $</p>
                      </div>
                    </div>

                  )

                })}<div className="orderPriceBox">
                  <div className="orderPriceBoxleft">
                    <a className="link-to-add-product" href="#">Add product</a>
                  </div>
                  <div className="orderPriceBoxright">
                    <div className="orderPriceBoxright2">
                      <p>Order price: <span>{totalOrderPrice}.00 $</span></p>
                      <button>ORDER</button>
                    </div>
                  </div>
                </div>
              </div>) : undefined}

            </div>
          </div>
        </div>
        {addbag.length > 0 || addbagcolection.length > 0 ? (
          <div className="bag-order-box">
            <p className="order-text">Order price: <span>{totalSum + totalOrderPrice}.00$</span> </p>
            <button className="order-btn">order</button>
          </div>
        ) : undefined}
      </div>
    </>
  )

}
