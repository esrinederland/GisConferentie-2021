import requests
import arcgis
from arcgis.gis import GIS
from arcgis.features import FeatureLayer
from datetime import datetime


_gis = None


def main():

    # Get the GIS object
    gis = GetGIS()

    # Get the featurelayer
    item_fs = gis.content.get("7f98c3a0ee214efb827699aef8ea16e7")
    fl = FeatureLayer(f"{item_fs['url']}/0", gis)

    # Infinite loop
    while True:

        # Get the ISS position
        result = requests.get('http://api.open-notify.org/iss-now.json').json()

        # Create a feature representing the ISS location
        feature = {
            'attributes': {
                'OBJECTID': 1
            },
            'geometry': {
                'x': result['iss_position']['longitude'],
                'y': result['iss_position']['latitude'],
                'spatialReference': {
                    'wkid': 4326
                }
            }
        }

        # Get the time of now
        now = datetime.now()
        try:
            # Update the featurelayer
            result_update = fl.edit_features(updates=[feature])
            print(f'{now.strftime("%H:%M:%S")} - Positie ISS geüpdatet')

        except:
            print('Fout opgetreden')

        # Wait 30 seconds to get a new position
        time.sleep(30)


def GetGIS():
    global _gis

    _portalUsername = "portalUsername"  # Change into your portal username
    """Get a GIS object using the profile, if the user not logged in then the password can be filled in"""

    if _gis is None:
        profileName = "arcgis_{}".format(_portalUsername)

        # get GIS
        _gis = GIS('https://www.arcgis.com', profile=profileName)

        # if the users.me is None, logging in through the profilename did not succeed. Then get a password and create the profile
        if _gis.users.me is None:
            import getpass
            pwd = getpass.getpass("Voer een wachtwoord in: ")
            _gis = arcgis.GIS('https://www.arcgis.com', username=_portalUsername,
                              password=pwd, profile=profileName)

        print("Successfully logged into '{}' via the '{}' user".format(
            _gis.properties.portalHostname, _gis.properties.user.username))

    return _gis


if __name__ == "__main__":
    main()
