"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function TrackingScript() {
  useEffect(() => {
    console.log("Tracking script initialisé");

    window.LanceurDesFonctions = function () {
      console.log("LanceurDesFonctions() a été exécuté !");
      
      var version = jQuery.fn.jquery;
      console.log("Version de jQuery détectée :", version);
      
      var versionSubVersion = version.split(".");
      if (versionSubVersion[0] == "1" && parseInt(versionSubVersion[1]) < 7) {
        if (jQuery.fn.on == undefined) {
          jQuery.fn.extend({
            on: function (events, data, handler) {
              return this.live(events, data, handler);
            },
          });
        }
      }

      var url = document.location.href;
      var referal = document.referrer;
      var lang = navigator.language;
      var useragent = navigator.userAgent;
      var navig = navigator.appVersion;
      var idsession;

      console.log("URL visitée :", url);
      console.log("Référent :", referal);

    
      
      if (sessionStorage.getItem("idsk")) {
        idsession = sessionStorage.getItem("idsk");
        console.log("Session existante ID :", idsession);
        jQuery.get("https://www.khaz.fr/writesecprec.php", {
          idsession,
          referal,
          url,
        });
      } else {
        idsession = Math.random();
        sessionStorage.setItem("idsk", idsession);
        console.log("Nouvelle session ID générée :", idsession);
        console.log("Envoi de la requête vers IP-API...");

        fetch("https://pro.ip-api.com/json?fields=country,regionName,city,org,isp,mobile,continent,zip,lat,lon,currency,callingCode,proxy,hosting,query&key=LNTEpAzHwoNMaW7&lang=fr")
          .then(response => response.json())
          .then(data => {
            console.log("Réponse API IP-API :", data);

            fetch("https://www.khaz.fr/write.php", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                referal,
                url,
                pays: data.country,
                ville: data.city,
                ip: data.query,
                region: data.regionName,
                lang,
                navig,
                idsession,
                useragent,
                mobile: data.mobile,
                org: data.org,
                isp: data.isp,
                continent: data.continent,
                zip: data.zip,
                lat: data.lat,
                lon: data.lon,
                currency: data.currency,
                callingcode: data.callingCode,
                proxy: data.proxy,
                hosting: data.hosting,
              })
            })
              .then(res => console.log("Données envoyées à khaz.fr :", res))
              .catch(err => console.error("Erreur d'envoi à khaz.fr :", err));
          })
          .catch(error => console.error("Erreur API IP-API :", error));
      }
    };
  }, []);

  return (
    <>
      {/* Injection du script jQuery si non présent */}
      <Script
        id="jquery-script"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("jQuery script chargé");
          if (typeof window.jQuery === "undefined") {
            window.jQuery = window.$;
            console.log("jQuery n'était pas défini, il est maintenant chargé.");
          }
          window.LanceurDesFonctions();
        }}
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
      />
    </>
  );
}
