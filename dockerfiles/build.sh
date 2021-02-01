# http://192.168.2.40:30090/#!/deploy?namespace=big-devil
version=$1
docker build . -t big-devil/uni-patient-view:${version}
docker tag big-devil/uni-patient-view:${version} 192.168.2.50/big-devil/uni-patient-view:${version}
docker push 192.168.2.50/big-devil/uni-patient-view:${version}
docker images