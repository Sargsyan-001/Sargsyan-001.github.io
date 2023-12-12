import Home from "../pages/home/Home";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import Wishlist from "../pages/wishList/Wishlist";
import Bag from "../pages/bag/Bag";
import Braslet from "../pages/braslete/Braslet";
export const NavMenu = [
    { id: 1, element: <Home />, path: "/", menu: false },
    { id: 2, name: "wishlist", element: <Wishlist />, path: "/wishlist", menu: true, icon: <FavoriteBorderIcon /> },
    { id: 4, name: "bracelet", element: <Braslet />, path: "/bracelet", menu: true, icon: <CurrencyBitcoinIcon /> },
    { id: 3, name: "bag", element: <Bag />, path: "/bag", menu: true, icon: <BusinessCenterIcon /> },
    { id: 5, name: "error", element: <div>error</div>, path: "*", menu: false }
];