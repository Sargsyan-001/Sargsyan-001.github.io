import "./wishlist.css"
import { Modal } from '@mui/material';
import { GetCharms } from "../../slices/CharmsSlice"
import { GetColection } from "../../slices/CollectionSlice"
import { GetAddBag, PostAddBag } from "../../slices/AddBagSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios"

export default function Wishlist() {
  const colections = useSelector(state => state.colection.colection)
  const charms = useSelector(state => state.charms.charms)
  const addbag = useSelector(state => state.addbag.addbag)
  const dispatch = useDispatch()
  const [modalId, setModalId] = useState(0)
  const [openModalInfo, setOpenModalInfo] = useState(false)

  const handleClose = () => {
    setOpenModalInfo(false)
  };
  useEffect(() => {
    dispatch(GetAddBag())
    dispatch(GetColection())
    dispatch(GetCharms())
  }, [])

  function AddToBag4(id, charmName, charmPrice, charmImg) {
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

  function AddToBag3(id, charmName, charmPrice, charmImg) {
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
      <div className="wishlist-parent-box">
        <div className="wish-item-box">
          <div className="wish-item-top">
            {/* colect Maping */}

            {colections.map(({ id, colectionName, colectionPrice, colectionImg, isFavour, setLetColor }) => {
              return (
                !isFavour ?
                  (<div
                    key={id}
                    className='collection-item1'>
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
                        <p>{colectionPrice} $</p>
                      </div>
                    </div>
                    <div className='add-seemore-box'>
                      <div className='add-bag'>
                        <p
                          onClick={() => { AddToBag3(id, colectionName, colectionPrice, colectionImg) }}
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
                  </div>) : undefined
              )
            })}
          </div>
          <div className="wish-item-bottom">
            {/* charms Maping */}

            {charms.map(({ id, charmName, charmPrice, charmImg, isFavour, setLetColor }) => {
              return (
                !isFavour ?
                  (<div
                    key={id}
                    className='collection-item1'>
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
                          onClick={() => { AddToBag4(id, charmName, charmPrice, charmImg) }}
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
                  </div>) : undefined
              )
            })}
          </div>
        </div>
      </div>
    </>

  )
}
