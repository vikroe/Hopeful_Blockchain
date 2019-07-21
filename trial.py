from hyperledger.client import Client

c = Client(base_url="http://localhost:17050")

print(c.peer_list())