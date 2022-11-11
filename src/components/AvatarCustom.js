import React, {useEffect, useState} from "react";
import "react-color-palette/lib/css/styles.css";
import {ColorPicker, useColor} from "react-color-palette";
import PropTypes from "prop-types";
import {auth, database} from "../initFirebase";
import "firebase/compat/storage"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import {getDoc, doc, updateDoc} from 'firebase/firestore'

// 'X-RapidAPI-Key': '53c0717abamsh12e9ecc41ba6cc7p1892ecjsn2fddd02797cb',
// 'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'

// 'X-RapidAPI-Key': '96a4e87f9emsh328fe90239660d8p159ca6jsn0a17636b4501',
// 'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'

// 'X-RapidAPI-Key': 'd3d5572e9cmsh9b7f676291565f0p1fe26cjsn81b8ccdb76d2',
// 'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
// 'X-RapidAPI-Key': '7efcf51a94msh633475178167321p1e9398jsn94694871e69c',
// 'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
// 'X-RapidAPI-Key': '53c0717abamsh12e9ecc41ba6cc7p1892ecjsn2fddd02797cb',
// 'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
// 'X-RapidAPI-Key': 'cd524b29efmsh084899770454f5bp1960fdjsn889dfc5a81d1',
// 'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
// 'X-RapidAPI-Key': 'ec42c633f3msh677591c838efc1fp151e4cjsn921664ec7c15',
// 'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
// 'X-RapidAPI-Key': 'd3d5572e9cmsh9b7f676291565f0p1fe26cjsn81b8ccdb76d2',
// 'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
// 'X-RapidAPI-Key': '61e0e12657msh4081d0c61398c53p1dd63fjsn54be421afad9',
// 'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
// 'X-RapidAPI-Key': '0a6c673840msh1410d11d7bc071ep1e6ca8jsn412b1141dd63',
// 'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
// 'X-RapidAPI-Key': '97a90eb51emshf9eba9d69493f14p15110fjsne016918584d1',
// 'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
// 'X-RapidAPI-Key': '576b52e05cmsh518fa0aa980ff0bp1debb8jsn5b3a2d557485',
// 'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'

const optionsPost = {
    method: 'POST',
    headers: {
        'X-RapidAPI-Key': '96a4e87f9emsh328fe90239660d8p159ca6jsn0a17636b4501',
    'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'

    }
};
const optionsPut = {
    method: 'PUT',
    headers: {
        'X-RapidAPI-Key': '96a4e87f9emsh328fe90239660d8p159ca6jsn0a17636b4501',
        'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'

    }
};
const optionsGet = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '96a4e87f9emsh328fe90239660d8p159ca6jsn0a17636b4501',
        'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'

    }
};

ColorPicker.propTypes = {
    color: PropTypes.any,
    onChange: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number
};

export default function Avatar() {
    const [down, setDown] = useState('');
    const aut = auth.currentUser.uid;
    const [avatar, setAvatar] = useState('');
    const [key, setKey] = useState('');

    useEffect(() => {
        console.log(aut)
        getAva();

        async function getAva() {
            const docRef = doc(database, "users/", aut);
            const docSnap = await getDoc(docRef);
            const ava = docSnap.get("avatarURL");
            const ke = docSnap.get("avatarKey");
            const ass = docSnap.get("avatarAsset");
            const hai = docSnap.get("avatarHair");
            const se = docSnap.get("avatarSex");
            if (ava !== avatar && typeof ava != "undefined") {
                setAvatar(ava)
                setKey(ke)
                setAsset(ass)
                setHair(hai)
                setSex(se)
                setShowFragment(true);
                setDown('1')
            }
        }
    }, [down])

    //Wait the sex pick to display the interface
    function handleSexClick(e) {
        console.log("Sex ID : " + e.target.id);
        setSex(e.target.id);
        setChangeSex(true)
        setShowFragment(true);
    }

    const [changeSex, setChangeSex] = useState(false)
    const [sex, setSex] = useState('')
    //Create new avatar
    useEffect(() => {
        if (changeSex)
            fetchData()

        async function fetchData() {
            const res = await fetch('https://doppelme-avatars.p.rapidapi.com/avatar/' + sex, optionsPost);
            const data = await res.json();
            console.log("Avatar JSON : ", data);
            setAvatar(data.avatarSrc);
            console.log("AvatarSrc :", data.avatarSrc);
            setKey(data.doppelme_key);
            console.log("AvatarKey :", data.doppelme_key);
            setChangeSex(false)
        }
    }, [sex]);


    //Fetch asset list
    const [assets, setAssets] = useState([]);
    useEffect(() => {
        fetchData()

        async function fetchData() {
            const res = await fetch('https://doppelme-avatars.p.rapidapi.com/assets/1101/eye', optionsGet);
            const data = await res.json();
            console.log("Assets JSON : ", data);
            const assets = data.asset_ids.map(a => {
                return {key: a.id, description: a.description, img: a.thumbnailSrc};
            })
            setAssets(assets)
            console.log("Assets list :", assets);
        }
    }, [])

    //Fetch hair list
    const [hairs, setHairs] = useState([]);
    useEffect(() => {
        fetchHairs()

        async function fetchHairs() {
            const res = await fetch('https://doppelme-avatars.p.rapidapi.com/assets/1101/hair', optionsGet);
            const data = await res.json();
            console.log("Hairs JSON : ", data);
            const hairs = data.asset_ids.map(a => {
                return {key: a.id, description: a.description, img: a.thumbnailSrc};
            })
            setHairs(hairs)
            console.log("Hairs list :", hairs);
        }
    }, [])


    //Function to change the asset
    const [oldAsset, setOldAsset] = useState('')
    const [asset, setAsset] = useState('')
    const [deleteAsset, setDeleteAsset] = useState(false)

    function changeAsset(id) {
        setOldAsset(asset)

        if (asset == id.toString()) {
            setDeleteAsset(true)
            setAsset('')
        } else if (oldAsset != '') {
            setDeleteHair(true)
            setAsset(id.toString())
        } else {
            setAsset(id)
        }
    }

    useEffect(() => {
        let ava = avatar;
        setAvatar('')
        fetechDeletion()

        async function fetechDeletion() {
            if (deleteAsset) {
                const removeUrl = 'https://doppelme-avatars.p.rapidapi.com/avatar/' + key + '/eye'
                const res = await fetch(removeUrl, optionsPut);
                const data = await res.json();
                //console.log("Delete asset : ", data);
                if (asset != '') {
                    fetchModification()
                } else {
                    if (data.avatarSrc === '') {
                        setAvatar(ava)
                    } else {
                        setAvatar(data.avatarSrc)
                    }
                    //console.log("Old asset2 : " + oldAsset)
                    //console.log("New asset ID : " + asset)
                }
            } else fetchModification();
        }

        async function fetchModification() {
            if (sex == '')
                return
            const addUrl = 'https://doppelme-avatars.p.rapidapi.com/avatar/' + key + '/' + asset;
            const res = await fetch(addUrl, optionsPut);
            const data = await res.json();
            //console.log("Change asset : ", data);
            if (typeof data.avatarSrc == "undefined") {
                setAvatar(ava)
            } else {
                setAvatar(data.avatarSrc)
            }
            //console.log("Old asset3 : " + oldAsset)
            //console.log("New asset ID : " + asset)
        }

        setDeleteAsset(false);
    }, [asset])

    //Function to change hair
    const [oldHair, setOldHair] = useState('')
    const [hair, setHair] = useState('')
    const [deleteHair, setDeleteHair] = useState(false)

    function changeHair(id) {
        setOldHair(hair)

        if (hair == id.toString()) {
            setDeleteHair(true)
            setHair('')
        } else if (oldHair != '') {
            setDeleteHair(true)
            setHair(id.toString())
        } else {
            setHair(id)
        }
    }

    useEffect(() => {
        let ava = avatar;
        setAvatar('')
        fetechDeletion()

        async function fetechDeletion() {
            if (deleteHair) {
                const removeUrl = 'https://doppelme-avatars.p.rapidapi.com/avatar/' + key + '/hair'
                const res = await fetch(removeUrl, optionsPut);
                const data = await res.json();
                //console.log("Delete hair : ", data);
                if (hair !='') {
                    fetchModification()
                } else {
                    if (data.avatarSrc === '') {
                        setAvatar(ava)
                    } else {
                        setAvatar(data.avatarSrc)
                    }
                    //console.log("Old hair2 : " + oldHair)
                    //console.log("New hair ID : " + hair)
                }
            } else fetchModification();
        }

        async function fetchModification() {
            if (sex == '')
                return
            const addUrl = 'https://doppelme-avatars.p.rapidapi.com/avatar/' + key + '/' + hair;
            const res = await fetch(addUrl, optionsPut);
            const data = await res.json();
            //console.log("Change asset : ", data);
            if (typeof data.avatarSrc == "undefined") {
                setAvatar(ava)
            } else {
                setAvatar(data.avatarSrc)
            }
            //console.log("Old hair3 : " + oldHair)
            //console.log("New hair ID : " + hair)
        }

        setDeleteHair(false);
    }, [hair])


    //Color used in the ColorPicker
    const [color, setColor] = useColor("hex", "");

    //Function to change the asset color
    const [assetColor, setAssetColor] = useState('');
    const [displayAssetColorPicker, setDisplayAssetColorPicker] = useState(false);

    function changeColorAsset() {
        setDisplayAssetColorPicker(false)
        if (assetColor != color.hex){
            setAssetColor(color.hex)
            setAvatar('')
            //console.log("Asset color : " + color.hex)
            //console.log("New asset color : " + assetColor)
        }

    }

    function handleAssetClick() {
        setDisplayAssetColorPicker(!displayAssetColorPicker)
    };
    useEffect(() => {
        if (assetColor != '')
            fetchColorAsset()

        async function fetchColorAsset() {
            const newColor = assetColor.substring(1, 7)
            const res = await fetch('https://doppelme-avatars.p.rapidapi.com/avatar/' + key + '/eye/' + newColor, optionsPut);
            const data = await res.json();
            //console.log("Change color asset : ", data);
            setAvatar(data.avatarSrc)
        }
    }, [assetColor])

    //Function to change hair color
    const [displayColorHairPicker, setDisplayColorHairPicker] = useState(false);
    const [hairColor, setHairColor] = useState('');

    function changeColorHair() {
        setDisplayColorHairPicker(false)
        if (hairColor != color.hex){
            setHairColor(color.hex)
            setAvatar('')
            //console.log("Hair color : " + color.hex)
            //console.log("New hair color : " + hairColor)
        }

    }

    function handleHairClick() {
        setDisplayColorHairPicker(!displayColorHairPicker)
    }


    useEffect(() => {
        if (hairColor != '')
            fetchColorHair()

        async function fetchColorHair() {
            const newColor = hairColor.substring(1, 7);
            const res = await fetch('https://doppelme-avatars.p.rapidapi.com/avatar/' + key + '/hair/' + newColor, optionsPut);
            const data = await res.json();
            //console.log("Change color skin : ", data);
            setAvatar(data.avatarSrc)
        }
    }, [hairColor])

    //Function to change skin color
    const [displayColorSkinPicker, setDisplayColorSkinPicker] = useState(false);
    const [skinColor, setSkinColor] = useState('');

    function handleSkinClick() {
        setDisplayColorSkinPicker(!displayColorSkinPicker)
    };

    function changeColorSkin() {
        setDisplayColorSkinPicker(false)
        if (skinColor != color.hex)
        {
            setSkinColor(color.hex)
            setAvatar('')
            //console.log("Skin color : " + color.hex)
            //console.log("New skin color : " + skinColor)
        }
    }

    useEffect(() => {
        if (skinColor != '')
            fetchColorSkin()

        async function fetchColorSkin() {
            const newColor = skinColor.substring(1, 7);
            //console.log("Skin color : " + skinColor)
            const res = await fetch('https://doppelme-avatars.p.rapidapi.com/avatar/' + key + '/skin/' + newColor, optionsPut);
            //console.log('https://doppelme-avatars.p.rapidapi.com/avatar/' + key + '/skin/' + newColor)

            const data = await res.json();
            //console.log("Change color skin : ", data);
            setAvatar(data.avatarSrc)
        }
    }, [skinColor])

    //Function to save avatar values
    function handleSaveClick() {
        a();

        async function a() {
            const docRef = doc(database, "users", aut);
            await updateDoc(docRef, {
                avatarURL: avatar,
                avatarKey: key,
                avatarHair: hair,
                avatarAsset: asset,
                avatarSex: sex
            });
            //console.log("Avatar: " + avatar)
            //console.log("Key: " + key)
            //console.log("Hair: " + hair)
            //console.log("Asset: " + asset)
            //console.log("Sex: " + sex)
        }
    }

    const [showFragment, setShowFragment] = useState(false);

    return (
        <>
            <div className="buttons">
                <button id='1101' alt="man" onClick={(e) => handleSexClick(e)}>Man</button>
                <button id='1102' alt="woman" onClick={(e) => handleSexClick(e)}>Woman</button>
                {showFragment ?
                    <button alt="assetColor" onClick={handleAssetClick}>Pick Asset Color</button>: null}
                {
                    displayAssetColorPicker ? <div className='popover'>
                        <div className='cover' onClick={changeColorAsset}/>
                        <ColorPicker width={150} height={150}
                                     color={color}
                                     onChange={setColor} hideHSV hideHEX hideRGB/>
                    </div> : null
                }
                {showFragment ?
                <button alt="skinColor" onClick={handleSkinClick}>Pick Skin Color</button>: null}
                {displayColorSkinPicker ? <div className='popover'>
                    <div className='cover' onClick={changeColorSkin}/>
                    <ColorPicker width={150} height={150}
                                 color={color}
                                 onChange={setColor} hideHSV hideHEX hideRGB/>
                </div> : null}

                {showFragment ?
                <button alt="hairColor" onClick={handleHairClick}>Pick Hair Color</button>: null}
                {displayColorHairPicker ? <div className='popover'>
                    <div className='cover' onClick={changeColorHair}/>
                    <ColorPicker width={150} height={150}
                                 color={color}
                                 onChange={setColor} hideHSV hideHEX hideRGB/>
                </div> : null}
            </div>
            {showFragment ?
                <>
                    <div className='colorAvatar'>
                        <li>
                            <img alt="Avatar" src={avatar}/>
                        </li>
                        <li>
                            <button alt="saveAvatar" onClick={handleSaveClick}>Save</button>
                        </li>
                    </div>
                    <h2>Select your accessories</h2>
                    <div>
                        <ul className='assetsList'>
                            {assets.slice(1, 6).map((asset) => (
                                <li key={asset.key} className='assetsImage'>
                                    { /* asset.description */}
                                    <img alt="asset" className="assetsImage img" src={asset.img}
                                         onClick={() => changeAsset(asset.key.toString())}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h2>Select your hairs</h2>
                    <div>
                        <ul className='assetsList'>
                            {hairs.slice(1, 6).map((hair) => (
                                <li key={hair.key} className='assetsImage'>
                                    { /* hair.description */}
                                    <img alt="hair" className="assetsImage img" src={hair.img}
                                         onClick={() => changeHair(hair.key)}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </> : null}
        </>
    );
}
