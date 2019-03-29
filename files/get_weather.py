"""
This script can be used to check if TM1py can connect to your TM1 instance
"""
import configparser
import requests
import sys
import json
import getpass
import geocoder
import TM1py
from distutils.util import strtobool
from TM1py.Services import TM1Service, ElementService
from TM1py.Objects import Dimension, Hierarchy, Element
from TM1py.Utils import Utils

config = configparser.ConfigParser()
config.read('..\config.ini')



 
 
 
# Parameters for connection
# Connection Parameters for TM1 Instance
 
password = ""
namespace = ""
address = "localhost"
port = "8882"
ssl = strtobool("True")

if len(namespace.strip()) == 0:
    namespace = None  
    def main(tm1): 
         
        region = tm1.cubes.cells.get_value("System User Settings", "Admin,Region,String", ['}Clients','System User Settings Parameter','System User Settings Measure'])
        regionName = tm1.cubes.cells.get_value("}ElementAttributes_Region", ""+region+",Description", ['Region','}ElementAttributes_Region'])
        print(regionName, region)
        g = geocoder.ip('me')
        print(regionName)
        api_key = "feb028d6a3cf8710e58aaf25b2ed29f4"
        nurl = "https://api.openweathermap.org/data/2.5/weather?q={}&units=metric&appid={}".format(regionName, api_key)
        json_data = requests.get(nurl).json()
        
         
        cells = dict()
        for (k, v) in json_data.items(): 
            clouds = 'clouds'
            weather = 'weather'
            main = 'main'
            coord = 'coord'
            city = "name"
            syst = "sys"
            #print("Key: " + k) 
            x = str(v)
            #print(x)
            
            if k == clouds: 
                #print("Key: " + k) 
                #print("Clouds Value: " + str(v['all']) )
                value = str(v['all'])
                coordinates = ("Admin","clouds","String")
                cells[coordinates] = value
            elif k == weather: 
                #print("Key: " + k) 
                #print("Main Weather Value: " + str(v[0]['main'])  )
                value = str(v[0]['main'])
                coordinates = ("Admin","description","String")
                cells[coordinates] = value
                 
            elif k == main:
                #print("Key: " + k) 
                #print("Main Temp Value: " + str(v["temp"]) ) 

                value = str(v["temp"]) 
                coordinates = ("Admin","temperature","String")
                cells[coordinates] = value
            elif k == coord:
               # print("Key: " + k) 
               # print("Long  Value: " + str(v["lon"]) ) 
                valuelon = str(v["lon"]) 
                coordinates = ("Admin","longitude","String")
                cells[coordinates] = valuelon
                
                #print("Lat  Value: " + str(v["lat"]) ) 
                valuelat = str(v["lat"]) 
                coordinates = ("Admin","latitude","String")
                cells[coordinates] = valuelat
            elif k == city:
                print("City  Value: " + str(v) ) 
                valuelcity = str(v) 
                coordinates = ("Admin","city","String")
                cells[coordinates] = valuelcity
                 
            elif k == syst:
                valuelstate= str(v["country"]) 
                coordinates = ("Admin","location","String")
                cells[coordinates] = valuelstate
                
        tm1.cubes.cells.write_values("User Weather", cells)
         

if __name__ == "__main__":
    with TM1Service(address=address, port=port, user="admin", password=password, namespace=namespace, ssl=ssl) as tm1:
        server_name = tm1.server.get_server_name()
        main(tm1)


    #print(unused_dimensions)
    #print("Connection to TM1 established!! your Servername is: {}".format(server_name))