package accounts;

import jolie.runtime.JavaService;
import jolie.runtime.Value;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.Keys;
import java.security.Key;

public class JWTokens extends JavaService {

  public Value EncodeToken(Value request ) {
        String secret = request.getFirstChild( "secret" ).strValue();
        String user = request.getFirstChild("username").strValue();
        System.out.println("Signing user " + user + " with secret " + secret);

        byte[] byteKey = secret.getBytes();
        Key key = Keys.hmacShaKeyFor(byteKey);
        String jwt = Jwts.builder().setSubject(user).signWith(key).compact();
        Value response = Value.create();
		    response.getFirstChild( "token" ).setValue(jwt);

        return response;
    }

    public Value DecodeToken(Value request) {
        String secret = request.getFirstChild("secret").strValue();
        String jwt = request.getFirstChild("token").strValue();

        byte[] byteKey = secret.getBytes();
        Key key = Keys.hmacShaKeyFor(byteKey);

        String success = ""; 
        String username = "";
        Jws<Claims> jws = null;
        try {
            jws = Jwts.parser().setSigningKey(key).parseClaimsJws(jwt);
            username = jws.getBody().getSubject();
            success = "true";
        } catch (JwtException ex) {
          success = "false";
        }

        Value response = Value.create();
        response.getFirstChild("success").setValue(success);
        response.getFirstChild("username").setValue(username);

        return response;
    }
}
