import { React, useEffect, useState } from "react";
import Header from 'components/Header';
import SideBar from "components/SideBar";
import Footer from 'components/Footer';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
    getItem, updateItemName, updateItemPrice, updateItemStock,
    updateItemDescription, updateItemCategory, updateItemDiscount,
    updateItemImage, updateItemLocation, updateItemSubcategory
} from 'actions/itemActions';
import LoadingBox from 'components/LoadingBox';
import MessageBox from 'components/MessageBox';
import { Link } from "react-router-dom";
import { RegionDropdown } from 'react-country-region-selector';

export default function EditItemPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [itemname, setItemname] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [subCategoryName, setSubcategory] = useState('');
    const [discount, setDiscount] = useState(0);
    const [imageURL, setImageURL] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const communityName = userInfo.marketProfile.communityName;

    const itemGet = useSelector((state) => state.itemGet);
    const { loading, error, item } = itemGet;

    const itemUpdate = useSelector(state => state.itemUpdate);
    const { item: ifupdate } = itemUpdate;

    let type = null;
    let options = null;

    const products = ["food", "clothing", "home", "toys", "pets", "crafts"];
    const services = ["landscaping", "homemaintenance"];
    const expertises = ["consulting", "traning"];


    
    if (item) {
        if (item.category === "products") {
            type = products;
        } else if (item.category === "services") {
            type = services;
        } else if (item.category === "expertises") {
            type = expertises;
        }
        if (type) {
            options = type.map((x) => <option value={x}>{x}</option>);
        }
    }

    useEffect(() => {
        dispatch(getItem(id));
        /*
        if (ifupdate) {
            window.location.reload();
        }
        */
    }, [dispatch, id, ifupdate]);


    console.log("Updated Item: " + JSON.stringify(item) );



    const update = (e, key, newValue, optionalValue) => {
        e.preventDefault();
        switch (key) {
            case 0:
                if (newValue == "" || newValue.length > 15 ) {
                    window.alert("Invalid Item Name!");
                } else {
                    dispatch(updateItemName(id, newValue));
                }
                break;
            case 1:
                if (newValue < 0) {
                    window.alert("Invalid Item Price!");
                } else {
                    dispatch(updateItemPrice(id, newValue));
                }
                break;
            case 2:
                if (newValue < 0) {
                    window.alert("Invalid Item Stock!");
                } else {
                    dispatch(updateItemStock(id, newValue));
                }
                break;
            case 3:
                dispatch(updateItemDescription(id, newValue));
                break;
            case 4:
                if (newValue < 0) {
                    window.alert("Invalid Item Category!");
                } else {
                    dispatch(updateItemCategory(id, newValue));
                }
                break;
            case 5:
                dispatch(updateItemSubcategory(id, newValue));
                break;
            case 6:
                dispatch(updateItemLocation(id, newValue, optionalValue));
                break;
            case 7:
                dispatch(updateItemDiscount(id, newValue));
                break;
            case 8:
                dispatch(updateItemImage(id, newValue));
        }
    };


    return (
        <div>
            <Header />
            <div className="sidebar-content">
                <SideBar />
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div className="container create-item-form-container">
                        <div className="columns mt-5">
                            <div className="column is-half is-offset-one-quarter">
                                <h1 className="title is-1">Edit Your Item</h1>
                                <div className="field">
                                    <label className="label">Item Name</label>
                                    <div className="control">
                                        <input type="text" className="input" defaultValue={item.itemName} required onChange={(e) => setItemname(e.target.value)} />
                                    </div>
                                    <p class="help">Should not exceed 15 characters</p>

                                    <button onClick={(e) => update(e, 0, itemname)} className="button is-link is-outlined">Update</button>

                                    {itemname.length > 15 ?
                                        <div class="notification is-danger">
                                            Invalid Item Name
                                                </div> : null}
                                </div>

                                <div className="field">
                                    <label className="label">Unit Price</label>
                                    <div className="field has-addons ">
                                        <div className="control">
                                            <input type="number" className="input" defaultValue={item.unitPrice} required onChange={(e) => setPrice(parseInt(e.target.value))} />
                                        </div>

                                        <div class="control">
                                            <a class="button is-static">
                                                Dollars
                                                    </a>
                                        </div>
                                        <button onClick={(e) => update(e, 1, price)} className="button is-link is-outlined">Update</button>
                                    </div>
                                    {price < 0 ?
                                        <div class="notification is-danger">
                                            Invalid Price
                                                </div> : null}
                                </div>

                                <div className="field">
                                    <label className="label">Stock</label>
                                    <div className="field has-addons">
                                        <div className="control">
                                            <input type="number" className="input" defaultValue={item.stock} required onChange={(e) => setStock(parseInt(e.target.value))} />
                                        </div>

                                        <div class="control">
                                            <a class="button is-static">
                                                Units
                                                    </a>
                                        </div>
                                        <button onClick={(e) => update(e, 2, stock)} className="button is-link is-outlined">Update</button>
                                    </div>
                                    {stock < 0 ?
                                        <div class="notification is-danger">
                                            Invalid Stock
                                                </div> : null}
                                </div>

                                <div class="field">
                                    <label class="label">Description</label>
                                    <div class="control">
                                        <textarea class="textarea" defaultValue={item.description} required onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>
                                    <button onClick={(e) => update(e, 3, description)} className="button is-link is-outlined">Update</button>
                                </div>

                                <div class="field">
                                    <label class="label">Update category</label>
                                    <div className="field has-addons">
                                        <div class="control">
                                            <div class="select">
                                                <select defaultValue={item.category} required onChange={(e) => setCategory(e.target.value)}>
                                                    <option value="-1">--</option>
                                                    <option value="products">product</option>
                                                    <option value="services">service</option>
                                                    <option value="expertises">expertise</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button onClick={(e) => update(e, 4, category, subCategoryName)} className="button is-link is-outlined">Update</button>
                                    </div>
                                    <label class="label">Update subcategory</label>
                                    <div className="field has-addons">
                                        <div class="control">
                                            <div class="select">
                                                <select defaultValue={item.subcategory} required onChange={(e) => setSubcategory(e.target.value)}>
                                                    <option value="-1">--</option>
                                                    {options}
                                                </select>
                                            </div>
                                        </div>
                                        <button onClick={(e) => update(e, 5, subCategoryName)} className="button is-link is-outlined">Update</button>
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Update location</label>
                                    <div className="field has-addons">
                                        <div class="control">
                                            <div class="select">
                                                <RegionDropdown
                                                    country={communityName.charAt(0).toUpperCase() + communityName.slice(1)}
                                                    defaultOptionLabel = {"Selected: " + item.province}
                                                    value={province}
                                                    onChange={(e) => setProvince(e)}
                                                />
                                            </div>
                                        </div>
                                        <input type="text" className="input" defaultValue={item.city} required onChange={(e) => setCity(e.target.value)} />
                                        <button onClick={(e) => update(e, 6, province, city)} className="button is-link is-outlined">Update</button>
                                    </div>
                                </div>

                                <div>
                                    <label class="label">Discount</label>
                                    <div class="control">
                                        <div class="select">
                                            <select defaultValue={item.discount} required onChange={(e) => setDiscount(parseInt(e.target.value))} >
                                                <option value="-1">--</option>
                                                <option value="0">No discount available</option>
                                                <option value="1">Buy one get one free</option>
                                                <option value="2">Buy two get one free</option>
                                                <option value="3">Buy three get one free</option>
                                                <option value="4">Buy four get one free</option>

                                            </select>
                                        </div>
                                        <button onClick={(e) => update(e, 7, discount)} className="button is-link is-outlined">Update</button>
                                    </div>
                                </div>


                                <div className="field">
                                    <label className="label">Item Image</label>
                                    <div className="control">

                                        <img src={item.itemImage} alt="Image"></img>
                                        <input type="text" className="input" defaultValue={item.itemImage} required onChange={(e) => setImageURL(e.target.value)} />
                                        <button onClick={(e) => update(e, 8, imageURL)} className="button is-link is-outlined">Update</button>

                                    </div>
                                </div>


                                <Link to="/my-item" className="button is-danger">Go Back</Link>
                            </div>

                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
