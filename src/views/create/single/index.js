import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import AssetPath from '../../../helpers/AssetHelper.js';
import Config from '../../../config/pinata.json';
import web3 from '../../../connection/web3';
import Web3Context from '../../../store/web3-context';
import NFTCollectionContext from '../../../store/NFTCollectionContext';
import NFTCollectionJson from '../../../abis/NFTCollection.json';
import { toast } from 'react-toastify';
import axios from 'axios';
import GradButton from '../../../ui-component/GradButton'

const Single = (props) => {
	const [enteredName, setEnteredName] = useState('');
	const [descriptionIsValid, setDescriptionIsValid] = useState(true);
	const [enteredDescription, setEnteredDescription] = useState('');
	const [nameIsValid, setNameIsValid] = useState(true);
	const [capturedFile, setCapturedFile] = useState(null);
	const [fileIsValid, setFileIsValid] = useState(true);
	const [mintState, setMintState] = useState(0);
	const web3Context = useContext(Web3Context);
	const nftCollectionContext = useContext(NFTCollectionContext);
	const [nftCollectionContract, setNFTCollectionContract] = useState();
	useEffect(() => {
		const loadContracts = async () => {
			if (!nftCollectionContext.contract) {
				const networkId = web3Context.networkId;
				const contract = await nftCollectionContext.loadContract(web3, NFTCollectionJson, NFTCollectionJson.networks[networkId]);
				setNFTCollectionContract(contract);
			}
			else setNFTCollectionContract(nftCollectionContext.contract);
		};
		loadContracts();
	}, [props])
	const enteredNameHandler = (event) => {
		setEnteredName(event.target.value)
	};
	const enteredDescriptionHandler = (event) => {
		setEnteredDescription(event.target.value);
	};
	const captureFile = (event) => {
		event.preventDefault();

		const file = event.target.files[0];
		setCapturedFile(file);
	};
	const submissionHandler = (event) => {
		event.preventDefault();
		enteredName ? setNameIsValid(true) : setNameIsValid(false);
		enteredDescription ? setDescriptionIsValid(true) : setDescriptionIsValid(false);
		capturedFile ? setFileIsValid(true) : setFileIsValid(false);
		const formIsValid = enteredName && enteredDescription && capturedFile;

		if (!nftCollectionContract) {
			toast.error('Please connect to wallet first!');
			return;
		}

		// Upload file to IPFS and push to the blockchain
		const uploadNFTs = async () => {
			try {
				let data = new FormData();
				data.append("file", capturedFile);
				const url_file_pinata = `https://api.pinata.cloud/pinning/pinFiletoIPFS`;
				setMintState(1)
				let response = await axios.post(url_file_pinata, data, {
					headers: {
						"Content-Type": `multipart/form-data; boundary= ${data._boundary}`,
						pinata_api_key: Config.PINATA_API_KEY,
						pinata_secret_api_key: Config.PINATA_API_SECRET,
					},
				})

				const mint_data = { name: enteredName, description: enteredDescription, image: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash }
				const url_json_pinata = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
				let hash_response = await axios
					.post(url_json_pinata, mint_data, {
						headers: {
							pinata_api_key: Config.PINATA_API_KEY,
							pinata_secret_api_key: Config.PINATA_API_SECRET,
						},
					})

				await createToken(hash_response.data.IpfsHash);
			} catch (error) {
				toast.error(error.message);
				setMintState(0);
			}
		}

		const createToken = async (metaHash) => {
			setMintState(2)
			try {
				if (!window.ethereum) {
					window.alert("You didn't connected to metamask!")
					return;
				}
				await nftCollectionContract.methods
					.createToken(metaHash)
					.send({ from: web3Context.account })
					.on('transactionHash', function (hash) {
						setMintState(0);
						toast.success('Successfully minted！');
					})
					.on('receipt', function (receipt) {
						setMintState(0);
						const returnValues = receipt.events.TokenCreated.returnValues;
					});
			} catch (error) {
				toast.error(error.message);
				setMintState(0);
			}
		}
		formIsValid && uploadNFTs();
		// formIsValid && createToken("QmXDQu8FnFiziSWHuNoTeiGaxeVfGV3b3oyGsSdEGUrKhF");
	};

	const nameClass = nameIsValid ? "form-control" : "form-control is-invalid";
	const descriptionClass = descriptionIsValid ? "form-control" : "form-control is-invalid";
	const fileClass = fileIsValid ? "form-control" : "form-control is-invalid";

	return (
		<>
			<div className="hero__upload">
				<div className="container">
					<div className="space-y-5">
						{/* <Link to="#" className="btn btn-white btn-sm switch"> Switch to Multiple</Link> */}
						<h2 className="title">Create Your NFT</h2>
					</div>
				</div>
			</div>
			<div className="modal fade popup" id="popup_preview" tabIndex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<button type="button" className="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<div className="modal-body space-y-5 p-0">
							<div className="card__item three m-0 in__popup">
								<div className="card_body space-y-2">

									<div className="card_head">
										<img src={`${AssetPath("img/items/item_4.png")}`}
											alt="" />
										<Link to="#" className="likes space-x-1">
											<i className="ri-heart-3-fill"></i>
											<span className="txt_sm">2.1k</span>
										</Link>
										<div className="action">
											<Link to="#" className="btn btn-primary btn-sm">
												<i className="ri-pie-chart-line color_white"></i>
												Place Your Bid
											</Link>
										</div>
									</div>

									<h6 className="card_title">
										Colorful Abstract Painting
									</h6>
									<div className="card_footer d-block space-y-2">
										<div className="d-flex justify-content-between">
											<div className="creators space-x-2">
												<div className="avatars -space-x-5">
													<Link to="#">
														<img
															src={`${AssetPath("img/avatars/avatar_3.png")}`}
															alt="Avatar" className="avatar avatar-sm" />
													</Link>
													<Link to="#">
														<img
															src={`${AssetPath("img/avatars/avatar_2.png")}`}
															alt="Avatar" className="avatar avatar-sm" />
													</Link>
												</div>
												<Link to="#">
													<p className="avatars_name txt_sm">
														@makinzi_jamy... </p>
												</Link>
											</div>
											<Link to="#" className="space-x-1">
												<p className="color_green txt_sm">0.001 ETH</p>
											</Link>
										</div>
										<div className="hr"></div>
										<Link to="#" className="d-flex align-items-center
											space-x-2">
											<i className="ri-vip-crown-line"></i>
											<p className="color_text txt_sm" style={{ width: 'auto' }}>Highest bid</p>
											<span className="color_black txt_sm">0.001 ETH</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="box in__upload mb-6">
					<div className="row">
						<div className="col-lg-6">
							<div className="left__part space-y-10 md:mb-5 upload_file">
								<div className="space-y-5">
									<img className="icon"
										src={`${AssetPath("img/icons/upload.svg")}`}
										alt="" />
									<h5>Drag and drop your file</h5>
									<p className="color_text">PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
								</div>
								<div className="space-y-5">
									<p className="color_text">or choose a file</p>
									<Link to="#" className={`btn btn-white ${fileClass}`}> Browse files In Your Local Computer </Link>
									<input type="file" className={`${fileClass}`} onChange={captureFile} />
								</div>
							</div>
						</div>
						<div className="col-lg-6 h-auto">
							<div className="form-group space-y-2 h-full">
								<div className="space-y-5 h-full" style={{
									position: 'relative'
								}}>
									<div className="space-y-2">
										<span className="nameInput">Name</span>
										<input type="text" className={`${nameClass} form-control`} placeholder="e. g. `design art`" value={enteredName} onChange={enteredNameHandler} />
									</div>
									<div className="space-y-2 h-auto">
										<span className="nameInput">Description <span className="color_text"> (optional) </span></span>
										<textarea type="text" className={`${descriptionClass} form-control`} placeholder="e. g. `design art`"
											value={enteredDescription} onChange={enteredDescriptionHandler} style={{height: '210px'}}></textarea>
									</div>
									<div style={{
										position: 'absolute',
										bottom: '0px',
										right: '0px'
									}}>
										<div className="row content justify-content-end">
											<div className="col-md-auto col-12">
												<div className="space-x-2">
													<Link to="/marketplace" className="btn btn-white others_btn">Cancel</Link>
													{/* <Link to="#" className="btn btn-dark others_btn" data-toggle="modal" data-target="#popup_preview">Preview</Link> */}
												</div>
											</div>
											<div className="col-md-auto col-12">
												{
													(mintState == 0) ? (
														<GradButton onClick={submissionHandler}>Create Item</GradButton>
													) : (
														(mintState == 1) ? (
															<GradButton onClick={submissionHandler} disabled={true}>Uploading NFTs...</GradButton>
														) : (
															<GradButton onClick={submissionHandler} disabled={true}>Mint NFTs...</GradButton>
														)
													)
												}
											</div>
										</div>
									</div>
									{/* <div className="space-y-2">
										<span className="variationInput">Price</span>
										<select className="form-select custom-select"
											aria-label="Default select example">
											<option> 00.00 ETH</option>
											<option>01.00 ETH</option>
											<option>02.00 ETH</option>
											<option>10.00 ETH</option>
											<option>20.00 ETH</option>
										</select>
									</div> */}
									{/* <div className="space-y-2">
										<span className="variationInput">Choose collection</span>
										<div className="d-flex flex-column flex-md-row">
											<Link to="#" className="choose_collection mb-2
												mb-md-3 mr-0 mr-md-3">
												<div className="icon">
													<i className="ri-add-line"></i>
												</div>
												New collection</Link>
											<Link to="#" className="choose_collection is_brand">
												<img
													src={`${AssetPath("img/icons/raroin_icon.svg")}`}
													alt="" />
												Raroin Collection </Link>
										</div>
									</div> */}
								</div>
							</div>
							{/* <p className="color_black">
								<span className="color_text text-bold"> Service fee : </span>
								2.5%
							</p> <p className="color_black">
								<span className="color_text text-bold"> You will receive :
								</span>
								22.425 ETH $41,637.78
							</p> */}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Single;