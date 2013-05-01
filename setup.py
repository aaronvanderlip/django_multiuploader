# -*- coding: utf-8 -*-
from distutils.core import setup
from setuptools import find_packages

setup(
    name='django-jquery-multiuploader',
    version='0.1',
    author=u'Aaron VanDerlip',
    author_email='avanderlip@gmail.com',
    packages=find_packages(),
    url='',
    license='BSD license',
    description='Adds jQuery File Upload support',
    long_description='',
    include_package_data=True,
    install_requires=['django>= 1.3',],
    zip_safe=False,
)
