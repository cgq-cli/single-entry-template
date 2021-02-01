version=$0.0.1
docker build . -t 192.168.2.50/big-devil/uni-patient-view:${version}
docker push 192.168.2.50/big-devil/uni-patient-view:${version}