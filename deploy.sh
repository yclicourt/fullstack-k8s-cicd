#!/bin/bash
if ! kubectl get ns topics; then
    kubectl create ns topics
else
    kubectl config set-context --current --namespace=topics
    kubectl apply -R -f ./deploy-k8s/
    minikube service list
    minikube service frontend-topic-svc -n topics --url
    echo -n "------------------opening the service-----------------------"
    curl $(minikube service frontend-topic-svc -n topics --url)/version
fi