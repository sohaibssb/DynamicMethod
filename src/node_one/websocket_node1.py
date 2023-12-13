import json
import asyncio
import websockets
from websockets.exceptions import ConnectionClosed
from blueprints.models.node1_model import Node1Model

person_names = set()

async def on_connect(websocket):
    try:
        print('WebSocket connection opened')
        while True:
            data = await websocket.receive() 
            data = json.loads(data)

            if 'person_name' in data:
                person_name = data['person_name']
                person_names.add(person_name)

                Node1Model.create(person_name=person_name)

            data_to_send = list(person_names)
            await websocket.send(json.dumps({
                'person_names': data_to_send,
            }))

    except ConnectionClosed:
        pass
