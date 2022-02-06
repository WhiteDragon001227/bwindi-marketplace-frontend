/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 22/01/2022 - 18:50:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react'
import Header from '../layout/MainLayout/Header'
import Footer from '../layout/MainLayout/Footer'
import "./Homepage.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from '@mui/material';
import AssetPath from '../helpers/AssetHelper';
import Carousel from 'react-elastic-carousel'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Select from '@mui/material/Select';
import BG from '../assets/img/art01.png'
import Palette, { usePalette } from 'react-palette'
import TrendingCard from '../ui-component/TrendingCard'

const Homepage = () => {
    const { data, loading, error } = usePalette(`${AssetPath('img/art01.png')}`)
    const [color, setColor] = useState()
    const natable = ['1', '2', '3', '4', '5']
    const trending = [
        {
            name: '1',
            title: 'Forest Knight',
            content: 'Forest Knight\'s first-ever expansion NFTs on Polygon',
            img: 'art01.png'
        },
        {
            name: '2',
            title: 'Talking Heads by Javirroyo',
            content: '20 heads that talk about what happens inside them',
            img: 'art03.png'
        },
        {
            name: '3',
            title: 'Este',
            content: 'Mrs. Dalloway said she would buy the flowers herself',
            img: 'art04.png'
        },
        {
            name: '4',
            title: 'Kar: Istanbul Under Snow',
            content: '33 block and white photos of snowy Istanbul by Masis Usenmez',
            img: 'profile.jpeg'
        }
    ]
    const resources = [
        '10 tips for avoiding scams and staying safe on the decentralized web',
        'Keeping yourself safe when buying NFTs on the OpenSea',
        'The beginners\'s guide to creating & selling digital art NFTs',
    ]
    const browse_category = ['Art', 'Music', 'Domain Names', 'Virtual Worlds', 'Trading Cards', 'Collectables', 'Sports', 'Utility', 'All NFTs']
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        // { width: 1200, itemsToShow: 4 }
    ];
    useEffect(() => {
    }, [])

    return (
        <>
            <Header />
            <div className="w-full" style={{
                backgroundImage: `url(${AssetPath('img/art01.png')})`,
                /* Add the blur effect */
                filter: 'blur(100px)',
                // -webkit-filter: blur(8px);
                position: 'absolute',
                /* Full height */
                height: '600px',
                zIndex: '-1',
                /* Center and scale the image nicely */
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
            </div>
            <div className="mt-20 px-16 py-8 flex flex-col items-center" style={{ zIndex: '10' }}>
                <div className="lg:w-640 md:w-512 sm:w-320 w-full">
                    <div className="welcome_part flex justify-center items-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:text-left col-span-1 h-auto mt-8">
                                <div className="mt-4 text-5xl text-black font-semibold">Discover, collect, and sell extraordinary NFTs</div>
                                <div className="mt-6 text-2xl text-black">On the world's first &<br></br> largest NFT marketplace</div>
                                <div className="mt-6 flex justify-center md:justify-start items-center">
                                    <div>
                                        <Button className="w-40 h-14 rounded-3xl text-2xl" variant="filled-uncamel">Explore</Button>
                                    </div>
                                    <div className="ml-6">
                                        <Button className="w-40 h-14 rounded-3xl text-2xl" variant="filled-uncamel"
                                            style={{ border: '1px solid #4D6194', backgroundColor: 'white', color: '#4D6194' }}>Create</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 h-auto">
                                <div className="flex justify-center md:justify-end">
                                    <Card variant="hover" className="w-full md:w-4/5">
                                        <CardActionArea>
                                            <CardMedia className="h-25"
                                                component="img"
                                                image={`${AssetPath('img/art01.png')}`}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <div className="flex justify-start">
                                                    <div>
                                                        <img src={`${AssetPath('img/profile.jpeg')}`} className="rounded-full w-10" />
                                                    </div>
                                                    <div className="ml-5">
                                                        <div className="text-semibold text-black">Sacred Spaces #4</div>
                                                        <span className="text-blue-400">Jaime</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="natable_part mt-32">
                        <div className="text-3xl text-black font-semibold mx-auto w-full text-center">Natable Drops</div>
                        <div className="w-full mt-8">
                            <Carousel
                                breakPoints={breakPoints}
                                enableSwipe={true}
                            >
                                {
                                    natable.map((item, idx) => {
                                        return (
                                            <div className="mx-4">
                                                <div className="w-full">
                                                    <Card variant="hover" className="w-full">
                                                        <CardActionArea>
                                                            <CardMedia className="h-25"
                                                                component="img"
                                                                image={`${AssetPath('img/art01.png')}`}
                                                                alt="green iguana"
                                                            />
                                                            <CardContent>
                                                                <div className="flex justify-start">
                                                                    <div>
                                                                        <img src={`${AssetPath('img/profile.jpeg')}`} className="rounded-full w-10" />
                                                                    </div>
                                                                    <div className="ml-5">
                                                                        <div className="text-semibold text-black">Sacred Spaces #{item}</div>
                                                                        <span className="text-blue-400">Jaime</span>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </CardActionArea>
                                                    </Card>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>

                    <div className="trending_part mt-32">
                        <div className="mx-auto w-full text-center flex justify-center items-center">
                            <div className="text-3xl text-black font-semibold">Trending in&nbsp;&nbsp;</div>
                            <div>
                                <FormControl>
                                    <NativeSelect
                                        defaultValue={30}
                                        inputProps={{
                                            name: 'age',
                                            id: 'uncontrolled-native',
                                        }}
                                    >
                                        <option value={10}>Ten</option>
                                        <option value={20}>Twenty</option>
                                        <option value={30}>Thirty</option>
                                    </NativeSelect>
                                </FormControl>
                            </div>
                        </div>
                        <div className="w-full mt-8">
                            <Carousel
                                breakPoints={breakPoints}
                                enableSwipe={true}
                            >
                                {
                                    trending.map((item, idx) => {
                                        return (
                                            <div className="mx-4">
                                                <div className="w-full">
                                                    <TrendingCard img={`${AssetPath('img/' + item.img)}`} item={item.name}
                                                        title={item.title} content={item.content} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>

                    <div className="trading_nft_part mt-32">
                        <div className="text-3xl text-black font-semibold mx-auto w-full text-center">Create and sell your nfts</div>
                        <div className="w-full mt-8 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
                            <div className="col-span-1 flex items-center justify-center flex-col">
                                <div><img src={`${AssetPath('img/icons/wallet.svg')}`} /></div>
                                <div className="text-black text-center text-semibold text-2xl mt-4">Set up your wallet</div>
                                <div className="mt-4 text-center">
                                    Once you've set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the wallets we support.
                                </div>
                            </div>
                            <div className="col-span-1 flex items-center justify-center flex-col">
                                <div><img src={`${AssetPath('img/icons/collection.svg')}`} /></div>
                                <div className="text-black text-center text-semibold text-2xl mt-4">Create you collection</div>
                                <div className="mt-4 text-center">
                                    Click My Collections and set up your collection.
                                    Add social links, a description, profile & banner images, and set a secondary sales fee.
                                </div>
                            </div>
                            <div className="col-span-1 flex items-center justify-center flex-col">
                                <div><img src={`${AssetPath('img/icons/nft.svg')}`} /></div>
                                <div className="text-black text-center text-semibold text-2xl mt-4">Add your NFTs</div>
                                <div className="mt-4 text-center">
                                    Upload your work (image, video, aduio, or 3D art), add a title and description, and customize your NFTs with properfies, stats, and unlockable content.
                                </div>
                            </div>
                            <div className="col-span-1 flex items-center justify-center flex-col">
                                <div><img src={`${AssetPath('img/icons/list.svg')}`} /></div>
                                <div className="text-black text-center text-semibold text-2xl mt-4">List them for sale</div>
                                <div className="mt-4 text-center">
                                    Choose between auctions, fixed-price listings, and declinig-price listings. You choose how you want to sell your NFTs, and we help you sell them!
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="resources_part mt-32">
                        <div className="text-3xl text-black font-semibold mx-auto w-full text-center">Resources for getting stared</div>
                        <div className="w-full mt-8">
                            <Carousel
                                breakPoints={breakPoints}
                                enableSwipe={true}
                            >
                                {
                                    resources.map((item, idx) => {
                                        return (
                                            <div className="mx-4">
                                                <div className="w-full">
                                                    <Card variant="hover" className="w-full">
                                                        <CardActionArea>
                                                            <CardMedia className="h-25"
                                                                component="img"
                                                                image={`${AssetPath('img/art01.png')}`}
                                                                alt="green iguana"
                                                            />
                                                            <CardContent className="font-semibold text-black h-28 text-center">
                                                                {item}
                                                            </CardContent>
                                                        </CardActionArea>
                                                    </Card>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>

                    <div className="browse_category_part mt-32 mx-8">
                        <div className="text-3xl text-black font-semibold mx-auto w-full text-center">Browse by category</div>
                        <div className="w-full mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                            {
                                browse_category.map((item, idx) => {
                                    return (
                                        <div className="col-span-1">
                                            <Card variant="hover" className="w-full">
                                                <CardActionArea>
                                                    <CardMedia className="h-25"
                                                        component="img"
                                                        image={`${AssetPath('img/art01.png')}`}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent className="text-1xl font-semibold text-black text-center">
                                                        {item}
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div >
            <div className="opensea_part mt-8 py-8 w-full flex items-center justify-center flex-col" style={{ backgroundColor: '#F3FBFE' }}>
                <div className="md:w-640 sm:w-320">
                    <div className="w-full text-center">
                        <div className="text-5xl font-bold">Meet OpenSea</div>
                        <div className="text-1xl mt-4">The NFT Marketplace with everything for everyone</div>
                        <div className="mt-4 text-center flex justify-center flex-col"
                            style={{
                                background: `url(${AssetPath('img/video-background.svg')}) center center / contain no-repeat`
                            }}>
                            <div className="p-8">
                                <iframe className="w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen=""
                                    frameBorder="0"
                                    height="450"
                                    sandbox="allow-popups allow-same-origin allow-scripts allow-presentation"
                                    src="https://www.youtube.com/embed/gfGuPd1CELo?playlist=gfGuPd1CELo&autoplay=0&;controls=1&loop=0&modestbranding=1&rel=0"
                                    title="Meet OpenSea" width="560" />
                            </div>
                            <div>
                                <Button className="mt-8 w-96 text-2xl h-14 rounded-3xl" variant="filled-uncamel">Explore the Marketplace</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Homepage