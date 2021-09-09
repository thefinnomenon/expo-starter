## [Start] Determine request authentication mode **
#if( $util.isNullOrEmpty($authMode) && !$util.isNull($ctx.identity) && !$util.isNull($ctx.identity.sub) && !$util.isNull($ctx.identity.issuer) && !$util.isNull($ctx.identity.username) && !$util.isNull($ctx.identity.claims) && !$util.isNull($ctx.identity.sourceIp) && !$util.isNull($ctx.identity.defaultAuthStrategy) )
  #set( $authMode = "userPools" )
#end
## [End] Determine request authentication mode **
## [Start] Check authMode and execute owner/group checks **
#if( $authMode == "userPools" )
  ## No Static Group Authorization Rules **


  ## [Start] If not static group authorized, filter items **
  #if( !$isStaticGroupAuthorized )
    #set( $items = [] )
    #foreach( $item in $ctx.result.items )
      ## No Dynamic Group Authorization Rules **


      ## [Start] Owner Authorization Checks **
      #set( $isLocalOwnerAuthorized = false )
      ## Authorization rule: { allow: owner, ownerField: "userId", identityClaim: "cognito:username" } **
      #set( $allowedOwners0 = $util.defaultIfNull($item.userId, []) )
      #set( $identityValue = $util.defaultIfNull($ctx.identity.claims.get("username"), $util.defaultIfNull($ctx.identity.claims.get("cognito:username"), "___xamznone____")) )
      #if( $util.isList($allowedOwners0) )
        #foreach( $allowedOwner in $allowedOwners0 )
          #if( $allowedOwner == $identityValue )
            #set( $isLocalOwnerAuthorized = true )
          #end
        #end
      #end
      #if( $util.isString($allowedOwners0) )
        #if( $allowedOwners0 == $identityValue )
          #set( $isLocalOwnerAuthorized = true )
        #end
      #end
      ## [End] Owner Authorization Checks **


      #if( ($isLocalDynamicGroupAuthorized == true || $isLocalOwnerAuthorized == true) )
        $util.qr($items.add($item))
      #end
    #end
    #set( $ctx.result.items = $items )
  #end
  ## [End] If not static group authorized, filter items **
#end
## [End] Check authMode and execute owner/group checks **

#if( $ctx.error )
$util.error($ctx.error.message, $ctx.error.type)
#else
  #if( !$result )
    #set( $result = $ctx.result )
  #end
  $util.toJson($result)
#end