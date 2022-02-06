import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AssetPath from '../../../helpers/AssetHelper.js'

const Profile = (props) => {

	const [isCollection, setIsCollection] = useState(false)

	useEffect(() => {

	}, [])

	return (
		<>
			<div className="mb-24">
				<div className="hero__profile">
					<div className="cover">
						<img src={`${AssetPath("img/bg/prrofile.png")}`} alt="" />
					</div>
					<div className="infos">
						<div className="container">
							<div className="row flex-wrap align-items-center
								justify-content-between">
								<div className="col-md-auto mr-5">
									<div className="avatars d-flex space-x-5
										align-items-center">
										<div className="avatar_wrap">
											<img className="avatar avatar-lg"
												src={`${AssetPath("img/avatars/avatar_4.png")}`}
												alt="avatar" />
										</div>
										<h5>@ayoub fennouni</h5>
									</div>
								</div>
								<div className="col-md-auto">
									<div className="d-flex flex-wrap align-items-center
										space-x-5 mb-1_reset">
										<div className="mb-1">
											<div className="copy">
												<span className="color_text"> 13b9ebda0178...
												</span>
												<Link to="#">
													<i className="ri-file-copy-line color_text"></i>
												</Link>
											</div>
										</div>
										<div className="d-flex flex-wrap align-items-center
											space-x-5">
											<div className="mb-1">
												<Link to="#" className="btn btn-dark btn-sm">
													Follow
												</Link>

											</div>
											<div className="mb-1">
												<div className="share">
													<div className="icon">
														<Link to="#"> <i
															className="ri-share-line"></i>
														</Link>
													</div>
													<div className="dropdown__popup">
														<ul className="space-y-2">
															<li> <Link to="#"> <i
																className="ri-facebook-line"></i>
															</Link>
															</li>
															<li> <Link to="#"> <i
																className="ri-messenger-line"></i>
															</Link>
															</li>
															<li> <Link to="#"> <i
																className="ri-whatsapp-line"></i>
															</Link>
															</li>
															<li> <Link to="#"> <i
																className="ri-youtube-line"></i>
															</Link>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div className="mb-1">
												<div className="more">
													<div className="icon">
														<Link to="#"> <i
															className="ri-more-fill"></i>
														</Link>
													</div>
													<div className="dropdown__popup">
														<ul className="space-y-2">
															<li>
																<Link to="#"
																	className="space-x-2
																	d-flex">
																	<i className="ri-flag-line"></i>
																	<span> Report </span>
																</Link>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-3 col-md-7 order-md-0 order-1">
						<div className="profile__sidebar">
							<div className="space-y-10">
								<div className="space-y-2">
									<h5>About me</h5>
									<div className="box space-y-5">
										<p>
											I make art with the simple goal of giving you
											something
											pleasing to look at for a few seconds.
										</p>
										<div className="row">
											<div className="col-6">
												<span className="txt_sm color_text">Collections</span>
												<h4>105</h4>
											</div>
											<div className="col-6">
												<span className="txt_sm color_text">Creations</span>
												<h4>406</h4>
											</div>
										</div>
									</div>
								</div>
								<div className="space-y-2">
									<h5>Follow me</h5>
									<div className="box">
										<ul className="social_profile space-y-2 overflow-hidden">
											<li>
												<Link to="#">
													<i className="ri-facebook-line"></i>
													<span className="color_text">facebook/</span>
													@creabik
												</Link>
											</li>
											<li>
												<Link to="#">
													<i className="ri-messenger-line"></i>
													<span className="color_text"> messenger/</span>
													@creabik
												</Link>
											</li>
											<li>
												<Link to="#">
													<i className="ri-whatsapp-line"></i>
													<span className="color_text"> whatsapp/</span>
													@creabik
												</Link>
											</li>
											<li>
												<Link to="#">
													<i className="ri-youtube-line"></i>
													<span className="color_text">youtube/</span>
													@creabik
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<p className="text-center txt_sm mt-5 color_text">Since 2021</p>
						</div>
					</div>
					<div className="col-lg-9 col-md-12 order-md-1 order-0">
						<div className="profile__content">
							<div className="space-x-3">
								<div className="d-flex justify-content-between">
									<ul className="nav nav-tabs d-flex space-x-2 mb-8"
										role="tablist">
										<li className="nav-item" key={1}>
											<Link onClick={() => { setIsCollection(false) }}
												className={`btn btn-white btn-sm ${!isCollection && 'active'}`}
												data-toggle="tab"
												to="#"
												role="tab">
												Creations</Link>
										</li>
										<li className="nav-item" key={1}>
											<Link onClick={() => { setIsCollection(true) }}
												className={`btn btn-white btn-sm ${isCollection && 'active'}`}
												data-toggle="tab"
												to="#"
												role="tab">
												Collections</Link>
										</li>
									</ul>

									<div className="dropdown d-none d-sm-block">
										<button
											className="btn btn-white btn-sm dropdown-toggle"
											type="button"

											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false">
											Recent Active
										</button>
										<div
											className="dropdown-menu">
											<Link className="dropdown-item" to="#">Action</Link>
											<Link className="dropdown-item" to="#">Another action</Link>
											<Link className="dropdown-item" to="#">Something else here</Link>
										</div>
									</div>
								</div>

								<div className="tab-content">
									<div className={`tab-pane ${!isCollection && 'active'}`} id="tabs-1" role="tabpanel">
										<div className="row mb-30_reset">
											<div className="col-xl-4 col-lg-6 col-md-6">
												<div className="card__item three">
													<div className="card_body space-y-2">

														<div className="card_head">
															<img
																src={`${AssetPath("img/items/item_1.png")}`}
																alt=""
															/>
															<Link to="#" className="likes
																	space-x-1">
																<i
																	className="ri-heart-3-fill"></i>
																<span className="txt_sm">1.2k</span>
															</Link>
															<div className="action">
																<Link to="#" className="btn
																		btn-primary btn-sm
																		btn_auction"
																	data-toggle="modal"
																	data-target="#popup_bid">
																	<i
																		className="ri-auction-line
																			color_white"></i>&nbsp;
																	Place Your Bid
																</Link>
															</div>
														</div>

														<h6 className="card_title">
															<Link className="color_black"
																to="#">
																pop art Painting
															</Link>
														</h6>

														<div className="card_footer d-block
																space-y-2">
															<div className="d-flex
																	justify-content-between
																	align-items-center">
																<div className="creators
																		space-x-2">
																	<div className="avatars
																			-space-x-5">
																		<Link to="#">
																			<img
																				src={`${AssetPath("img/avatars/avatar_1.png")}`}
																				alt="Avatar"
																				className="avatar
																					avatar-sm"
																			/>
																		</Link>
																		<Link to="#">
																			<img
																				src={`${AssetPath("img/avatars/avatar_2.png")}`}
																				alt="Avatar"
																				className="avatar
																					avatar-sm"
																			/>
																		</Link>
																	</div>
																	<Link to="#">
																		<p
																			className="avatars_name
																				txt_sm">
																			@luka_fenn..
																		</p>
																	</Link>
																</div>
																<Link to="#"
																	className="space-x-1">
																	<p
																		className="color_green
																			txt_sm">0.001
																		ETH</p>
																</Link>
															</div>
															<div className="hr"></div>
															<div

																className="d-flex
																	align-items-center
																	space-x-2">
																<i
																	className="ri-vip-crown-line"></i>
																<p className="color_text
																		txt_sm"
																	style={{ width: 'auto' }}>
																	Highest bid
																</p>
																<span className="color_black
																		txt_sm">0.022
																	ETH</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className={`tab-pane ${isCollection && 'active'}`} id="tabs-2" role="tabpanel">
										<div className="row justify-content-start mb-30_reset">
											<div className="col-lg-6 col-md-6 col-sm-8">
												<div className="collections space-y-2 mb-8">
													<div className="collections_item">
														<div className="images-box space-y-2">
															<div className="d-flex space-x-2">
																<img style={{ width: '33.33%' }}
																	src={`${AssetPath("img/items/item_1.png")}`}
																	alt="" />
																<img style={{ width: '33.33%' }}
																	src={`${AssetPath("img/items/item_2.png")}`}
																	alt="" />
																<img style={{ width: '33.33%' }}
																	src={`${AssetPath("img/items/item_3.png")}`}
																	alt="" />
															</div>
															<div>
																<img src={`${AssetPath("img/items/item_4.png")}`}
																	alt="" />
															</div>
														</div>
													</div>
													<div className="collections_footer justify-content-between">
														<h5 className="collection_title"><Link to="#">Creative Art collection
														</Link></h5>
														<Link to="#" className="likes space-x-1">
															<i className="ri-heart-3-fill"></i>
															<span className="txt_md">2.1k</span>
														</Link>
													</div>
													<div className="creators space-x-2">
														<span className="color_text txt_md"> 5 items · Created by</span>
														<div className="avatars space-x-1">
															<Link to="#">
																<img
																	src={`${AssetPath("img/avatars/avatar_1.png")}`}
																	alt="Avatar" className="avatar avatar-sm" />
															</Link>
														</div>
														<Link to="#">
															<p className="avatars_name txt_sm"> @william_jamy... </p>
														</Link>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile