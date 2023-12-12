import "./home.css"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { GetColection } from '../../slices/CollectionSlice';
import { GetCharms } from "../../slices/CharmsSlice";
import { GetAddBag, PostAddBag } from "../../slices/AddBagSlice"
import { Link } from "react-router-dom";
import { Modal } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import SwiperBox from '../../swiper/Swiper'
import axios from "axios";

export default function Home() {
  const [modalId, setModalId] = useState(0)
  const dispatch = useDispatch()
  const colections = useSelector(state => state.colection.colection)
  const { loading } = useSelector(state => state.colection.colection)
  const charms = useSelector(state => state.charms.charms)
  const [openModalInfo, setOpenModalInfo] = useState(false)
  const addbag = useSelector(state => state.addbag.addbag)
  const handleClose = () => {
    setOpenModalInfo(false)
  };

  useEffect(() => {
    dispatch(GetColection())
    dispatch(GetCharms())
  }, [])

  function AddToBag(id, charmName, charmPrice, charmImg) {
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

  function AddToBag2(id, charmName, charmPrice, charmImg) {
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
      <section>
        {loading ? (
          <div className="load-div"></div>
        ) : (
          <> <div className='section-top'>
            <div className='section-top2'>
              <div className="sec-top-box">
                <h1>BRACLET</h1>
                <p>YOUR NEXT FAVE IS HERE</p>
                <Link className="to-your-own-design" to="/bracelet"><button>Design your own </button></Link>
              </div>
              <div className='swiper-box'>
                <SwiperBox />
              </div>
            </div>
          </div>
            <div className="section-bottom">
              <div className='section-bottom2'>
                <div className='buttons-for-chose'>
                  <button className='bottom-btns-slider'>braclet colection</button>
                  <button className='bottom-btns-slider'>new colection</button>
                  <button className='bottom-btns-slider'>Sale colection</button>
                </div>
                <div className='colection-charm-box'>
                  <div className='colection-title-box'>
                    <p>Collection</p>
                  </div>
                  <div className='colection-swiper-box'>

                    {/* colections map */}
                    {colections.map(({ id, colectionName, colectionPrice, colectionImg, isFavour, setLetColor }) => {
                      return (
                        <div
                          key={id}
                          className='collection-item'>
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
                                // dispatch(dispatch(GetColection()))
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
                              <p>{colectionPrice} $</p>
                            </div>
                          </div>
                          <div className='add-seemore-box'>
                            <div className='add-bag'>
                              <p
                                onClick={() => { AddToBag2(id, colectionName, colectionPrice, colectionImg) }}
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
                  </div>
                  <div className='colection-title-box'>
                    <p>Charms</p>
                  </div>
                  <div className='colection-swiper-box'>

                    {/* charms map */}

                    {charms.map(({ id, charmName, charmPrice, charmImg, isFavour, setLetColor }) => {
                      return (
                        <div
                          key={id}
                          className='collection-item'>
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
                              <p>{charmPrice} $</p>
                            </div>
                          </div>
                          <div className='add-seemore-box'>
                            <div className='add-bag'>
                              <p
                                onClick={() => { AddToBag(id, charmName, charmPrice, charmImg) }}
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
                                        <p>{charmPrice}.00$</p>
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
              </div>
            </div>
          </>
        )}

      </section>
    </>
  )
}
