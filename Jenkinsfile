node {


    stage('preparation'){
        checkout scm

    }



    stage('build/deploy'){

        def app = docker.build("nicksyrop/node_jenkins:latest")

docker.withRegistry('https://index.docker.io/v1/','17bfe91d-0946-46e3-8364-2d99bedc56f0'){

    app.push()
}

    }
}