from dotenv import dotenv_values
from pymongo import MongoClient
import certifi

def mongo_client():
    config = dotenv_values()

    return MongoClient(
        config["ATLAS_URI"],
        authMechanism="MONGODB-X509",
        tls=True,
        tlsCertificateKeyFile=config["CERT_X509"],
        tlsCAFile=certifi.where()
        )