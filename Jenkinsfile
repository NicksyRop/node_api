node {


    stage('preparation'){
        checkout scm

    }

    stage('build/deploy'){

docker.withregistry('https://index.docker.io/v1/','17bfe91d-0946-46e3-8364-2d99bedc56f0')

def app = docker.build("nicksyrop/node_jenkins:latest" , '.').push()
    }
}