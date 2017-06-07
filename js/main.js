(function() {
  var emailFormat, updateMask;

  $(document).ready(function() {
    $(window).bind("resize", function() {
      return updateMask();
    });
    $(window).load(function(e) {
      return updateMask();
    });
    updateMask();
    return document.getElementById("btnFormat").onclick = emailFormat;
  });

  updateMask = function() {
    var maskHeight, maskWidth;
    maskHeight = $(window).height();
    return maskWidth = $(window).width();
  };

  var htmlTag = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
%body%
</html>`

  var outlookStyle = `
    .o365button {
      display: block !important;
    }
    td div {
      display: block !important;
    }
    .x_fr-fil {
      display: block !important;
    }
    .x_fr-dib {
      display: block !important;
    }
    `

  var header = `
    <tr>
      <td>
        <table style="display: inline-table;" border="0" cellpadding="0" cellspacing="0" width="650">
          <tr>
            <td colspan="3" style="font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#666; text-align:center ">
              <p>&nbsp;</p>
              <p>
                Para asegurar la entrega de nuestras comunicaciones, por favor agregue
                <br> xxx@xxxxx.com a su libreta de direcciones.
                <br> Si no puede ver correctamente las im&aacute;genes de este correo <a href="#">haga clic aqu&iacute;.</a>
                <br>
                <br>
              </p>
            </td>
          </tr>
          
          %replace%

          <tr>
            <td colspan="3" style="font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#666; text-align:center ">
              <p>
                <br>
                <br> Nota: para garantizar que la informaci&oacute;n de este correo llegue correctamente,
                <br> es posible que algunas palabras lleguen sin tilde para evitar la desconfiguraci&oacute;n
                <br> de algunos caracteres.
                <br>
                <strong>Este correo electr&oacute;nico ha sido enviado a !*email*!.</strong>
              </p>
              <p>&nbsp;</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`

  emailFormat = function() {
    mailHtml = document.getElementById("htmlI").value.replace('\\', '');
    var mail = document.getElementById("show");
    mail.innerHTML = mailHtml;

    // Borrar etiqueta style

    var removeTag = mail.getElementsByTagName("style");
    mail.removeChild(removeTag[0]);

    // Borrar atributos de etiqueta img y agregar style

    var imgTags = Array.prototype.slice.call(mail.getElementsByTagName("img"));
    imgTags.forEach(function(tag, index){
      tag.removeAttribute("id");
      tag.removeAttribute("alt");
      tag.removeAttribute("height");
      tag.removeAttribute("name");
      tag.setAttribute("style", "display: block; border: none;");
    });

    // Borrar atributos de etiqueta table

    var tableTags = Array.prototype.slice.call(mail.getElementsByTagName("table"));
    tableTags.forEach(function(tag, index){
      tag.removeAttribute("style");
      tag.removeAttribute('left"');
    });

    // Reemplazar header

    var firstTableTag = mail.getElementsByTagName("table")[0];
    firstTableTag.setAttribute("align", "center");
    var inner = firstTableTag.innerHTML;
    header = header.replace("%replace%", inner);
    firstTableTag.innerHTML = header;

    // Agregar body

    var bodyTag = document.createElement("BODY");
    bodyTag.setAttribute("bgcolor", "#ffffff");

    // Agregar style outlook

    var styleTag = document.createElement("STYLE");
    styleTag.innerHTML = outlookStyle;

    // Obtener etiquetas head

    var titleTag = mail.getElementsByTagName("title")[0];
    var metaTag = mail.getElementsByTagName("meta")[0];

    //Agregar header

    var headTag = document.createElement("HEAD");

    headTag.appendChild(titleTag);
    headTag.appendChild(metaTag);
    mail.appendChild(headTag);
    bodyTag.appendChild(styleTag);
    bodyTag.appendChild(firstTableTag);
    mail.appendChild(bodyTag);

    var text = htmlTag.replace("%body%", mail.innerHTML);
    text = text.replace(/></g, ">\n<");
    document.getElementById("htmlF").value = text;
  };

}).call(this);

