// import React, {Component, useEffect, useState} from "react";
// import ReactDOM from "react-dom";
//
// import * as PropTypes from "prop-types";
//
// //'X-RapidAPI-Key': '78537ba732mshd0b4380b99a7eaap1c513cjsnb5f1e27752c4'
// //'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
// // const ped3 = "X-RapidAPI-Key': 'd3d5572e9cmsh9b7f676291565f0p1fe26cjsn81b8ccdb76d2'"
// // const ped4 = "'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'"
// // 'X-RapidAPI-Key': '96a4e87f9emsh328fe90239660d8p159ca6jsn0a17636b4501',
// // 'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
// // 'X-RapidAPI-Key': 'd3d5572e9cmsh9b7f676291565f0p1fe26cjsn81b8ccdb76d2',
// //     'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
//
//
// const optionsPost = {
//     method: 'POST',
//     headers: {
//         'X-RapidAPI-Key': '96a4e87f9emsh328fe90239660d8p159ca6jsn0a17636b4501',
//         'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
//     }
// };
// const optionsPut = {
//     method: 'PUT',
//     headers: {
//         'X-RapidAPI-Key': '96a4e87f9emsh328fe90239660d8p159ca6jsn0a17636b4501',
//         'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
//     }
// };
// const optionsGet = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '96a4e87f9emsh328fe90239660d8p159ca6jsn0a17636b4501',
//         'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
//     }
// };
//
// function Avatar(){
//     const [assets, setAssets] = useState([]);
//     const [avatar, setAvatar] = useState('');
//     const [key, setKey] = useState('');
//     const [asset, setAsset] = useState('')
//
//
//
//         useEffect( async () =>{
//             const res = await fetch('https://doppelme-avatars.p.rapidapi.com/avatar/1101', optionsPost);
//             const data = await res.json();
//             console.log("Avatar is ", data);
//
//             setAvatar(data.avatarSrc);
//             setKey(data.doppelme_key)
//
//             console.log("AvatarKey :", avatar);
//             console.log("AvatarSrc :", key);
//         })
//
//
//     function getAssets(){
//         useEffect(async () => {
//             const res = await fetch('https://doppelme-avatars.p.rapidapi.com/assets/1101/eye', optionsGet);
//             const data = await res.json();
//
//             console.log("Assets are ", data);
//
//             const assets = data.asset_ids.map(a => {
//                 return {key: a.id, description: a.description, img: a.thumbnailSrc};
//             })
//             setAssets(assets)
//
//             console.log("Assets urls :", assets);
//         })
//     }
//
//     function changeAssets(asset_id){
//         const addUrl = 'https://doppelme-avatars.p.rapidapi.com/avatar/'+{key}+'/' + asset_id + '\'';
//         useEffect(async () => {
//             const res = await fetch(addUrl, optionsPut);
//             const data = await res.json();
//
//             console.log("Change assets : ", data);
//         })
//     }
//
//         return(
//             <>
//                 <h1>Customize your avatar</h1>
//                 <div>
//                     {/*<button style="background: url("https://www.doppelme.com/225/asset.png")" onClick={}></button>*/}
//                 </div>
//                 <React.Fragment>
//                     <ul>
//                         {assets.map(assets =>(
//                             <li key={assets.id}>
//                                 {assets.description}
//                                 <img alt="asset" src={assets.img} onClick={e => changeAssets(assets.id)}/>
//                             </li>
//                         ))}
//                     </ul>
//                     <ul>
//                         <img src={avatar} alt="Avatar"/>
//                     </ul>
//                 </React.Fragment>
//             </>
//         );
// }
//
// export default Avatar;