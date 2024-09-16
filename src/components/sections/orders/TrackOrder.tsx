/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { OrderItemProps } from "../../../pages/orders";
import { ArrowLeft, OrderCheck, UncheckedOrder } from "../../icons";
import PageTransition from "../../defaults/PageTransition";
import { supabase } from "../../../../utils/supabaseClient";
import { UserDataProps } from "../../../pages/home";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import Spinner from "../../defaults/Spinner";

interface TrackOrderProps {
  order: OrderItemProps | undefined;
  isTracked: React.Dispatch<React.SetStateAction<boolean>>;
}

const TrackOrder: FC<TrackOrderProps> = ({ order, isTracked }) => {
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const [fallbackLocation, setFallbackLocation] = useState<string | null>(null);

  const companyAddress = "24 Agbowo Rd, Ibadan 200132, Oyo, Nigeria";
  const googleCloudApiKey = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleCloudApiKey,
    libraries: ["places"],
  });

  const mapCenter = { lat: 0, lng: 0 };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("userId", user.id);
        if (!error && data.length > 0) {
          setUserData(data[0]);
          getRoute(order?.deliveryAddress as string);
        }
      }
    };

    getUser();
  }, []);

  const getCurrentLocationFallback = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log("Using current location as fallback: ", { lat, lng });

          const directionsService = new google.maps.DirectionsService();
          const results = await directionsService.route({
            origin: companyAddress,
            destination: { lat, lng },
            travelMode: google.maps.TravelMode.DRIVING,
          });
          setDirectionsResponse(results);
          setFallbackLocation("Your current location");
        },
        (error) => {
          console.log("Error getting current location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const handleFallback = async (destination: string) => {
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ address: destination });
      if (response.results.length > 0) {
        const nearestLocation = response.results[0].formatted_address;
        setFallbackLocation(nearestLocation);
        await getRoute(nearestLocation);
      } else {
        console.log("No nearest location found. Falling back to current location.");
        getCurrentLocationFallback();
      }
    } catch (error) {
      console.log("Error with geocoding, falling back to current location.", error);
      getCurrentLocationFallback();
    }
  };

  const getRoute = async (destination: string) => {
    const directionsService = new google.maps.DirectionsService();

    try {
      const results = await directionsService.route({
        origin: companyAddress,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
    } catch (error) {
      console.log("Address not found, falling back to nearest possible location.", error);
      await handleFallback(destination);
    }
  };

  if (!isLoaded)
    return (
      <div className="h-[100vh] w-[100%] mx-auto flex flex-col items-center justify-center">
        <Spinner color="#000" />
      </div>
    );

    return (
      <PageTransition active="Orders">
        <div className="bg-[#ccc] h-[400px] relative">
          <div
            onClick={() => isTracked(false)}
            className="flex absolute left-6 top-10 bg-[#d9d9d9] p-2 rounded-full z-50 cursor-pointer"
          >
            <ArrowLeft />
          </div>
          <GoogleMap
            center={mapCenter}
            zoom={10}
            mapContainerStyle={{ width: "100%", height: "400px" }}
          >
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </div>
  
          {fallbackLocation && (
            <p className="text-[12px] mt-3 px-4 text-red-500">
              Could not locate the exact address, showing fallback location:{" "}
              {fallbackLocation}
            </p>
          )}
        <div className="px-4 pt-10 pb-[20vh]">
          <h2 className="font-semibold text-[20px]">Delivery Day and Time</h2>
          <p className="text-[14px]">
            Next {order?.items[0].deliveryDay} - {order?.items[0].deliveryTime}
          </p>
  
  
          <div className="pt-8 flex justify-between items-center text-[14px] space-x-4">
            <div>
              {order?.orderStatus !== "Failed" ? (
                <div className="flex flex-col items-center text-center space-y-2 font-light">
                  <OrderCheck />
                  <p>Order Accepted</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center space-y-2 font-light">
                  <UncheckedOrder />
                  <p>Order Accepted</p>
                </div>
              )}
            </div>
  
            <div
              className={`${
                order?.orderStatus === "Out for Delivery" ||
                order?.orderStatus === "Delivered"
                  ? "bg-[#C68A00]"
                  : "bg-[#d8cdab]"
              } w-[60px] h-[8px] rounded-full`}
            ></div>
  
            <div>
              {order?.orderStatus === "Out for Delivery" ||
              order?.orderStatus === "Delivered" ? (
                <div className="flex flex-col items-center text-center space-y-2 font-light">
                  <OrderCheck />
                  <p>Out for Delivery</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center space-y-2 font-light">
                  <UncheckedOrder />
                  <p>Out for Delivery</p>
                </div>
              )}
            </div>
  
            <div
              className={`${
                order?.orderStatus === "Delivered"
                  ? "bg-[#C68A00]"
                  : "bg-[#d8cdab]"
              } w-[60px] h-[8px] rounded-full`}
            ></div>
  
            <div>
              {order?.orderStatus === "Delivered" ? (
                <div className="flex flex-col items-center text-center space-y-2 font-light">
                  <OrderCheck />
                  <p>Delivered</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center space-y-2 font-light">
                  <UncheckedOrder />
                  <p>Delivered</p>
                </div>
              )}
            </div>
          </div>
  
          <div className="mt-10">
            <h2 className="font-semibold">Customer Information</h2>
            <div className="flex justify-between mt-2 text-[14px]">
              <p>
                {userData?.firstname} {userData?.lastname}
              </p>
              <p>{userData?.phone}</p>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  };
  
  export default TrackOrder;