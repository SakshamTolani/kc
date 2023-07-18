import React from "react";
// import { Carousel, Container, Image } from "react-bootstrap";
// import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Slider from "react-slick";
import { useState } from "react";
import SliderImage from "react-zoom-slider";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import ImageZoom from "react-image-zooom";

// function ImageCarousel({ image_one, image_two }) {
//   const properties = {
//     thumbnailPosition: "bottom",
//     useBrowserFullscreen: true,
//     showPlayButton: false,
//     items: [
//       {
//         original: image_one,
//         thumbnail: image_one,
//       },
//       {
//         original: image_two,
//         thumbnail: image_two,
//       },
//     ],
//   };
//   return (
//     <Container spacing={10} border={"1px solid #888"} maxW={"container.xl"}>
//       <Container xs={6}>
//         <ImageGallery {...properties} />;
//       </Container>
//       <Container spacing={2} xs={6} direction="column">
//         <Container>
//           <div id="myPortal" />
//         </Container>
//       </Container>
//     </Container>
//   );
// }
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
function ImageCarousel({ image_one, image_two, isDesktop = false }) {
  const [slider, setSlider] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);

  const changeToFull = () => {
    setFullScreen(!fullScreen);
  };

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const data = [
    {
      image: image_one,
      text: "img1",
    },
    {
      image: image_two,
      text: "img2",
    },
  ];
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });
  return (
    <Stack>
      {isDesktop ? (
        <Box w="600px" h="500px">
          <Box>
            <SliderImage
              data={data}
              width={isDesktop ? "90%" : "50%"}
              showDescription={false}
              direction="right"
            />
          </Box>
        </Box>
      ) : (
        <Box position={"relative"} width={"full"} overflow={"hidden"}>
          {/* CSS files for react-slick */}
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          {/* Left Icon */}
          <IconButton
            aria-label="left-arrow"
            colorScheme="messenger"
            borderRadius="full"
            position="absolute"
            left={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
          >
            <BiLeftArrowAlt />
          </IconButton>
          {/* Right Icon */}
          <IconButton
            aria-label="right-arrow"
            colorScheme="messenger"
            borderRadius="full"
            position="absolute"
            right={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
          >
            <BiRightArrowAlt />
          </IconButton>
          {/* Slider */}
          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {data.map((d, index) => (
              <Box
                key={index}
                height={"sm"}
                position="relative"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundImage={`url(${d.image})`}
                onClick={changeToFull}
              />
            ))}
          </Slider>
        </Box>
      )}
      {fullScreen && (
        <Modal isOpen={fullScreen} onClose={changeToFull} size={"full"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Click on Image to Zoom</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Box>
                  <ImageZoom
                    src={image_one}
                    key={image_one}
                    alt=""
                    zoom="200"
                  />
                  <ImageZoom
                    src={image_two}
                    key={image_two}
                    alt=""
                    zoom="200"
                  />
                </Box>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={changeToFull}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Stack>
  );
}

export default ImageCarousel;
