import "./braslete.css";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAddBagColect, PostAddBagColect } from "../../slices/AddBagColectSlice";
import { GetAddBag, PostAddBag } from "../../slices/AddBagSlice";
import { GetColection } from '../../slices/CollectionSlice';
import { GetCategory } from "../../slices/CategorySlice";
import { GetCharms } from "../../slices/CharmsSlice";
import { ColorsArr } from "../../colorsArr/ColorsArr";
import { GetGen } from "../../slices/GenSlice";
import { Modal } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from "axios";

export default function Braslet() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGender, setSelectedGender] = useState(null);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [colorBelt, setColorBelt] = useState("#494949");
  const [priceBelt, setPriceBelt] = useState(120);
  const [radio, setRadio] = useState(false);
  const [modalId, setModalId] = useState(0);
  const [arrBelt, setArrBelt] = useState([]);
  const colections = useSelector(state => state.colection.colection);
  const category = useSelector(state => state.category.category);
  const addbag = useSelector(state => state.addbag.addbag)
  const charms = useSelector(state => state.charms.charms);
  const gen = useSelector(state => state.gen.gen);
  const genQuery = +searchParams.get("gen");
  const categoryQuery = +searchParams.get("category");
  const dispatch = useDispatch();
  const handleClose = () => { setOpenModalInfo(false) };

  const handleGenderClick = (id) => {
    setSearchParams({ category: categoryQuery, gen: id });
    setSelectedGender(id);
  };

  const handleCategoryClick = (id) => {
    setSearchParams({ category: id, gen: selectedGender });
    setSelectedGender(null);
  };

  const calculateTotalPrice = (arrBelt) => {
    const total = arrBelt.reduce((acc, { beltPreic }) => acc + beltPreic, 0);
    return total.toFixed(2);
  };

  const handleRemoveItem = (itemId) => {
    const updatedBeltArray = arrBelt.filter(item => item.id !== itemId);
    setArrBelt(updatedBeltArray);
  };

  useEffect(() => {
    dispatch(GetColection());
    dispatch(GetCharms());
    dispatch(GetCategory());
    dispatch(GetGen());
  }, []);

  // only_charms_Item_Add function  
  function AddToBagPage(id, charmName, charmPrice, charmImg) {
    dispatch(GetAddBag());
    const existingItem = addbag.find(item => item.itemId === id);

    if (existingItem) {
      axios
        .patch(`http://localhost:3004/addbag/${existingItem.id}`, {
          countId: existingItem.countId + 1
        })
        .then(() => {
          dispatch(GetAddBag());
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      dispatch(
        PostAddBag({
          countId: 1,
          itemId: id,
          charmName,
          charmPrice,
          charmImg
        })
      ).then(() => {
        dispatch(GetAddBag());
      });
    }
  };

  // only_colections_Item_Add function 
  function AddToBagPage2(id, charmName, charmPrice, charmImg) {
    dispatch(GetAddBag());
    const existingItem = addbag.find(item => item.itemId === id);

    if (existingItem) {
      axios
        .patch(`http://localhost:3004/addbag/${existingItem.id}`, {
          countId: existingItem.countId + 1
        })
        .then(() => {
          dispatch(GetAddBag());
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      dispatch(
        PostAddBag({
          countId: 1,
          itemId: id,
          charmName,
          charmPrice,
          charmImg
        })
      ).then(() => {
        dispatch(GetAddBag());
      });
    }
  };
  return (
    <>
      <div className="braslet-box">
        <div className="braslet-left-box">
          <div className="category-box">
            <div className="category-box2">
              <ul className="category-ul">
                <li className="cat-blue-letter">For?</li>
                <ul className="category-ul2">
                  {gen.map(({ id, genName }) => {
                    const isSelected = (id === genQuery);
                    return (
                      <li
                        onClick={() => handleGenderClick(id)}
                        key={id}
                        className={`cat-list-name ${isSelected ? 'cat-list-name2' : ''}`}>{genName}
                      </li>
                    )
                  })}
                </ul>
                <hr className="hr-line" />
                <li className="cat-blue-letter">Collection</li>
                <li className="cat-list-name">Symbol</li>
                <li className="cat-list-name">All Symbols</li>
                <li className="cat-list-name">Heart</li>
                <li className="cat-list-name">Moon+Star</li>
                <li className="cat-list-name">Feather</li>
                <li className="cat-list-name">Letter</li>
                <hr className="hr-line" />
                <li className="cat-blue-letter">Material</li>
                <li className="cat-list-name">Leather Braclet</li>
                <li className="cat-list-name">Charm Brasclet</li>
                <li className="cat-list-name">Silicone Braslet</li>
                <li className="cat-list-name">Chain Braclet</li>
                <hr className="hr-line" />
                <li className="cat-blue-letter">Finish</li>
                <li className="cat-list-name">Silver</li>
                <li className="cat-list-name">Gold</li>
                <li className="cat-list-name">Rose Gold</li>
                <li className="cat-list-name">Two Tone</li>
                <li className="cat-list-name">Mixed Metal</li>
                <li className="cat-list-name">Midnight Silver</li>
              </ul>
            </div>
          </div>
        </div>
        {/* right-side */}

        <div className="braslet-right-box">
          <div className="col-charms-belts">
            {category.map(({ id, name, catImg }) => {
              const isSelected = (id === categoryQuery);
              return (
                <div
                  key={id}
                  onClick={() => handleCategoryClick(id)}
                  className={`col-charms-belts-items ${isSelected ? 'col-charms-belts-items2' : ''}`}>
                  <div className="choose-category-item1">
                    <img
                      className="choose-category-item1-img"
                      src={catImg} />
                  </div>
                  <div className="category-item-name">
                    <p>{name}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="category-item-parent-box">
            <div className="belts-top-box">
              <div className="sort-by-sort">
                <p>Sort By <AirlineStopsIcon /></p>
              </div>
              <div className="number-of-sort-items">
                <p>6 / 25</p>
              </div>
            </div>
            <div className="belts-bottom-box">

              {/* collection map */}
              {colections.map(({ id, colectionName, colectionPrice, colectionImg, isFavour, setLetColor, colCharmParentId }) => {
                return (colCharmParentId === categoryQuery || (colCharmParentId === categoryQuery && genQuery === id)) &&
                  (!selectedGender || (genQuery === id && selectedGender === id)) && (
                    <div
                      key={id}
                      className='collection-item-choose'
                      onClick={() => {
                        if (arrBelt.length <= 8) {
                          setArrBelt([...arrBelt, { beltId: Math.random(), beltName: colectionName, beltPreic: colectionPrice, beltImg: colectionImg, beltColor: setLetColor, beltCount: 1 }])
                        }
                      }}
                    >
                      <div className='collection-item-top'>
                        <img
                          className='col-letter-image'
                          style={{ filter: setLetColor }}
                          src={colectionImg}
                          alt="letter" />
                        <div
                          className='col-item-favourite-box'
                          onClick={() => {
                            axios.patch("http://localhost:3004/colection/" + id, { isFavour: !isFavour }).then(() => {
                              dispatch(GetColection())
                            })
                          }}
                        >
                          {isFavour ? <FavoriteBorderIcon className='col-item-favourite' /> : <FavoriteIcon className='col-item-favourite' />}
                        </div>
                        <div className="collection-item-top-choose-circles">
                          <div className="choose-circles"
                            onClick={() => {
                              axios.patch("http://localhost:3004/colection/" + id, { setLetColor: "grayscale(30%)" }).then(() => {
                                dispatch(GetColection())
                              })
                            }}
                          ></div>
                          <div className="choose-circles"
                            onClick={() => {
                              axios.patch("http://localhost:3004/colection/" + id, { setLetColor: "grayscale(0)" }).then(() => {
                                dispatch(GetColection())
                              })
                            }}
                          ></div>
                          <div className="choose-circles"
                            onClick={() => {
                              axios.patch("http://localhost:3004/colection/" + id, { setLetColor: "grayscale(1)" }).then(() => {
                                dispatch(GetColection())
                              })
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className='collection-name-box'>
                        <div className="collection-name">
                          <p>Available: <br />
                            {colectionName}</p>
                        </div>
                        <div className='coll-price'>
                          <p>{colectionPrice}.00 $</p>
                        </div>
                      </div>
                      <div className='add-seemore-box'>
                        <div className='add-bag'>
                          <p
                            onClick={() => { AddToBagPage(id, colectionName, colectionPrice, colectionImg) }}
                          >Add to bag</p>
                        </div>
                        <div className='see-more'>
                          <p onClick={() => {
                            setModalId(id)
                            setOpenModalInfo(!openModalInfo)
                          }}
                          >See more</p>

                          {/* modal */}
                          {modalId === id ? (
                            <Modal
                              className='collections_modal'
                              open={openModalInfo}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description">
                              <div className="modal-info-box">
                                <div className="close-modal"
                                  onClick={() => {
                                    setOpenModalInfo(false)
                                  }}
                                >
                                  <CloseIcon className="close-icon" fontSize="large" />
                                </div>
                                <div className="img-in-modal">
                                  <div className="img-modal-box">
                                    <img className="modal-info-img" src={colectionImg} />
                                    <div
                                      onClick={() => {
                                        axios.patch("http://localhost:3004/colection/" + id, { isFavour: !isFavour }).then(() => {
                                          dispatch(GetColection())
                                        })
                                      }}
                                      className="modal-favourite-box">
                                      {isFavour ? <FavoriteBorderIcon className='col-item-favourite' /> : <FavoriteIcon className='col-item-favourite' />}
                                    </div>
                                  </div>
                                  <div className="modal-choose-3variant">
                                    <div className="modal-choose-3">
                                      <img
                                        className="modal-choose-3-img"
                                        src="./assets/V.png" alt="X" />
                                    </div>
                                    <div className="modal-choose-3">
                                      <img
                                        className="modal-choose-3-img"
                                        src="./assets/V.png" alt="X" />
                                    </div>
                                    <div className="modal-choose-3">
                                      <img
                                        className="modal-choose-3-img"
                                        src="./assets/V.png" alt="X" />
                                    </div>
                                  </div>
                                </div>
                                <div className="info-in-modal">
                                  <div className="modal-name-colection">
                                    <p>{colectionName}</p>
                                  </div>
                                  <div className="modal-price-colection">
                                    <p>{colectionPrice}.00$</p>
                                  </div>
                                  <div className="modal-info-colection">
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel iusto, id nesciunt autem temporibus est necessitatibus sed officia esse fugit adipisci voluptatem natus similique veniam voluptate iste ipsum dolorum asperiores!</p>
                                  </div>
                                </div>
                              </div>
                            </Modal>
                          ) : undefined}
                        </div>
                      </div>
                    </div>
                  )
              })}

              {/* charms map */}

              {charms.map(({ id, charmName, charmPrice, charmImg, isFavour, setLetColor, colCharmParentId }) => {
                const isMatchingGender = !selectedGender || (colCharmParentId === genQuery && selectedGender === id);
                const isMatchingCategory = colCharmParentId === categoryQuery;
                return isMatchingGender && isMatchingCategory && (
                  <div
                    key={id}
                    className='collection-item-choose'
                    onClick={() => {
                      if (arrBelt.length <= 8) {
                        setArrBelt([...arrBelt, { beltId: Math.random(), beltName: charmName, beltPreic: charmPrice, beltImg: charmImg, beltColor: setLetColor, beltCount: 1 }])
                      }
                    }}
                  >
                    <div className='collection-item-top'>
                      <img
                        className='col-letter-image'
                        style={{ filter: setLetColor }}
                        src={charmImg}
                        alt="letter" />
                      <div
                        className='col-item-favourite-box'
                        onClick={() => {
                          axios.patch("http://localhost:3004/charms/" + id, { isFavour: !isFavour }).then(() => {
                            dispatch(GetCharms())
                          })
                        }}
                      >
                        {isFavour ? <FavoriteBorderIcon className='col-item-favourite' /> : <FavoriteIcon className='col-item-favourite' />}
                      </div>
                      <div className="collection-item-top-choose-circles">
                        <div className="choose-circles"
                          onClick={() => {
                            axios.patch("http://localhost:3004/charms/" + id, { setLetColor: "grayscale(30%)" }).then(() => {
                              dispatch(GetCharms())
                            })
                          }}
                        ></div>
                        <div className="choose-circles"
                          onClick={() => {
                            axios.patch("http://localhost:3004/charms/" + id, { setLetColor: "grayscale(0)" }).then(() => {
                              dispatch(GetCharms())
                            })
                          }}
                        ></div>
                        <div className="choose-circles"
                          onClick={() => {
                            axios.patch("http://localhost:3004/charms/" + id, { setLetColor: "grayscale(1)" }).then(() => {
                              dispatch(GetCharms())
                            })
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className='collection-name-box'>
                      <div className="collection-name">
                        <p>Available: <br />
                          {charmName}</p>
                      </div>
                      <div className='coll-price'>
                        <p>{charmPrice}.00 $</p>
                      </div>
                    </div>
                    <div className='add-seemore-box'>
                      <div className='add-bag'>
                        <p
                          onClick={() => { AddToBagPage2(id, charmName, charmPrice, charmImg) }}
                        >Add to bag</p>
                      </div>
                      <div className='see-more'>
                        <p onClick={() => {
                          setModalId(id)
                          setOpenModalInfo(!openModalInfo)
                        }}
                        >See more</p>
                        {modalId === id ? (
                          <Modal
                            className='collections_modal'
                            open={openModalInfo}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <div className="modal-info-box">
                              <div className="close-modal"
                                onClick={() => {
                                  setOpenModalInfo(false)
                                }}
                              >
                                <CloseIcon className="close-icon" fontSize="large" />
                              </div>
                              <div className="img-in-modal">
                                <div className="img-modal-box">
                                  <img className="modal-info-img" src={charmImg} />
                                  <div
                                    onClick={() => {
                                      axios.patch("http://localhost:3004/charms/" + id, { isFavour: !isFavour }).then(() => {
                                        dispatch(GetCharms())
                                      })
                                    }}
                                    className="modal-favourite-box">
                                    {isFavour ? <FavoriteBorderIcon className='col-item-favourite' /> : <FavoriteIcon className='col-item-favourite' />}
                                  </div>
                                </div>
                                <div className="modal-choose-3variant">
                                  <div className="modal-choose-3">
                                    <img
                                      className="modal-choose-3-img"
                                      src="./assets/V.png" alt="X" />
                                  </div>
                                  <div className="modal-choose-3">
                                    <img
                                      className="modal-choose-3-img"
                                      src="./assets/V.png" alt="X" />
                                  </div>
                                  <div className="modal-choose-3">
                                    <img
                                      className="modal-choose-3-img"
                                      src="./assets/V.png" alt="X" />
                                  </div>
                                </div>
                              </div>
                              <div className="info-in-modal">
                                <div className="modal-name-colection">
                                  <p>{charmName}</p>
                                </div>
                                <div className="modal-price-colection">
                                  <p>{charmPrice}.00 $</p>
                                </div>
                                <div className="modal-info-colection">
                                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel iusto, id nesciunt autem temporibus est necessitatibus sed officia esse fugit adipisci voluptatem natus similique veniam voluptate iste ipsum dolorum asperiores!</p>
                                </div>
                              </div>
                            </div>
                          </Modal>
                        ) : undefined}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* belt Colors */}

          <div className="belt-colors-box">
            <div className="belt-colors">
              <div className="belt-colors-top">
                <p>belt</p>
              </div>
              <div className="belt-colors-bottom">
                {ColorsArr.map(({ id, name, price, imgColor, color }) => {
                  return (
                    <div
                      onClick={() => {
                        setColorBelt(color)
                        setPriceBelt(price)
                      }}
                      key={id}
                      className="colors-items">
                      <div className="select-colors-circle">
                        <div className="color-circle">
                          <img
                            className="color-circle-img"
                            src={imgColor} />
                        </div>
                      </div>
                      <p className="colors-items-text">{name}</p>
                      <p className="colors-items-price">{price}.00 $</p>
                    </div>
                  )
                })}

              </div>
            </div>
          </div>

          {/* bottom-belt-add */}

          <div className="belt-bottom-box">
            <div className="refresh-icon-box"
              onClick={() => {
                setArrBelt([])
                setColorBelt("#494949")
                setPriceBelt(120)
              }}
            ><ReplayIcon /></div>
            <div className="belt-image-box">
              <div className="belt-construct">
                <div className="belt-construct-img">

                </div>
                <div className="belt-line" style={{ background: colorBelt }}>
                  <div className="add-in-belt-box">
                    {arrBelt.map(({ id, beltImg }) => {
                      return (
                        <div key={id} className="add-in-belt-item">
                          <img className="add-in-belt-item-image" src={beltImg} />
                        </div>
                      )
                    })}

                  </div>
                </div>
              </div>
            </div>
            <div className="belt-item-bottom-box">
              <div className="belt-col-box">
                <p>Belt</p>
              </div>
              <div className="size-width-for-belt">
                <div className="size-width-for-belt-left">
                  <select className="select-size" name="Size">
                    <option className="sel-size-opt" value="0">8 Sm</option>
                    <option className="sel-size-opt" value="0">12 Sm</option>
                    <option className="sel-size-opt" value="0">15 Sm</option>
                    <option className="sel-size-opt" value="0">20 Sm</option>
                  </select>
                  <select className="select-size" name="Width">
                    <option className="sel-size-opt" value="0">36 Sm</option>
                    <option className="sel-size-opt" value="0">52 Sm</option>
                    <option className="sel-size-opt" value="0">72 Sm</option>
                    <option className="sel-size-opt" value="0">84 Sm</option>
                  </select>
                  <button className="btn-belts">Belts</button>
                  <input
                    onClick={() => {
                      setRadio(!radio)
                    }}
                    type="radio"
                    checked={radio}
                    className="radio" />
                </div>
                <div className="size-width-for-belt-right">
                  <p>Belt prices: <span> {priceBelt}.00 $ </span></p>
                </div>
              </div>
              <div className="construct-items-in-belt-box">
                {arrBelt.map(({ id, beltPreic, beltImg }) => {
                  console.log(arrBelt);
                  return arrBelt.length <= 9 && (
                    <div
                      key={id}
                      className="construct-items-in-belt">
                      <div className="construct-items-in-belt-add">
                        <img className="mini-belt-img" src={beltImg} />
                      </div>
                      <div className="construct-items-in-belt-price">
                        <p>{beltPreic}$</p>
                      </div>
                      <div
                        onClick={() => handleRemoveItem(id)}
                        className="remove-construct-items-in-belt-add">
                        <CloseIcon fontSize="small" />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="total-price-box">
                <p>Total price: {(parseFloat(calculateTotalPrice(arrBelt)) + parseFloat(priceBelt)).toFixed(2)} $</p>
              </div>
            </div>
          </div>

          <div className="add-to-bag-and-order-box">
            <div className="add-to-bag-and-order-box-right">
              <button className="add-to-bag-all-collection-btn"
                onClick={() => {
                  const existingObjectIndex = arrBelt.findIndex(
                    (item) =>
                      item.beltName === "Custom Name Braclet" &&
                      item.addBeltColor === colorBelt &&
                      item.AddpriceBelt === priceBelt &&
                      item.onlyBeltId === Math.random()
                  );

                  if (existingObjectIndex !== -1) {
                    const updatedArrBelt = [...arrBelt];
                    updatedArrBelt[existingObjectIndex].countId += 1;

                    dispatch(
                      PostAddBagColect({
                        arrBelt: updatedArrBelt,
                        addBeltColor: colorBelt,
                        beltName: "Custom Name Braclet",
                        countId: updatedArrBelt[existingObjectIndex].countId,
                        AddpriceBelt: priceBelt,
                        onlyBeltId: Math.random(),
                      })
                    ).then(() => {
                      dispatch(GetAddBagColect());
                    });
                  } else {
                    const newCustomBelt = {
                      arrBelt,
                      addBeltColor: colorBelt,
                      beltName: "Custom Name Braclet",
                      countId: 1,
                      AddpriceBelt: priceBelt,
                      onlyBeltId: Math.random(),
                    };

                    dispatch(PostAddBagColect(newCustomBelt)).then(() => {
                      dispatch(GetAddBagColect());
                    });
                  }
                }}
              >Add to bag</button>
              <button className="belts-order-btn">Order</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
