db.adminCommand(
    {
      enableSharding: "microservices"
    }
 )

db.runCommand( { enableSharding : "products" } )