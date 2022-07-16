import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();
  console.log(listing);
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <main>
        {/* Slider */}
        <div
          className="shareIconDiv"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setShareLinkCopied(true);
            setTimeout(() => {
              setShareLinkCopied(false);
            }, 2000);
          }}
        >
          <img src={shareIcon} alt="share icon" />
        </div>
        {shareLinkCopied && <p className="linkCopied">Link Copied</p>}
        <div className="listingDetails">
          <p className="listingName">
            {listing.name} - $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <p className="listingLocation">{listing.Location}</p>
          <p className="listingType">
            For {listing.type === "rent" ? "Rent" : "Sale"}
          </p>
          {listing.offer && (
            <p className="discountPrice">
              ${listing.regularPrice - listing.discountedPrice} dicount
            </p>
          )}
          <ul className="listingDetailsList">
            <li>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} bedrooms`
                : `${listing.bedrooms} bedroom`}
            </li>
            <li>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms`
                : `${listing.bathrooms} bathrooms`}
            </li>
            <li>{listing.parking && "Parking Spot"}</li>
            <li>{listing.furnished && "Furnished"}</li>
          </ul>
          <p className="listingLocationTitle">Location</p>
          {/* Map  */}

          {auth.currentUser?.uid !== listing.userRef && (
            <Link
              to={`/contact/${listing.userRef}?listingName=${listing.name}&listingLocation=${listing.Location}`}
              className="primaryButton"
            >
              Contact Landlord
            </Link>
          )}
        </div>
      </main>
    </>
  );
}

export default Listing;
