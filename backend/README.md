# Garden Backend
Frontend is built with [FastAPI](https://fastapi.tiangolo.com/)

### Development

*Prequest*: python 3.6+

```
# under backend folder
pip3 install -r requirements.txt
python3 main.py
```

Check localhost:5000 to see if backend up running.

A virtualenv could be setup as well for a clean isolated running environment for this project.
```
virtualenv -p python3.8.5 garden_env # create a virtual env named `garden_env` with python 3.8.5
```

then a `garden_env` folder should appear once init done, run `source garden_env/bin/activate`

will activate the virtual env, `deactivate` will shut it down. Remember to install dependencies 

at the first time of launching the virtual env since it won't contain the packages installed 

in the system.


### API doc
FastAPI provides auto-generated API document at endpoint `/docs`.
