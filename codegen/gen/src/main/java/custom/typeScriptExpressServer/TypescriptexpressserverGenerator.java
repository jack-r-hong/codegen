package custom.typeScriptExpressServer;

import io.swagger.codegen.v3.*;
import io.swagger.codegen.v3.generators.DefaultCodegenConfig;

import java.util.*;
import java.io.File;
import org.apache.commons.lang3.StringUtils;

public class TypescriptexpressserverGenerator extends DefaultCodegenConfig {

  // source folder where to write the files
  protected String sourceFolder = "src";
  protected String apiVersion = "1.0.0";
  protected String implFolder = "service";

  public CodegenType getTag() {
    return CodegenType.CLIENT;
  }

  public String getName() {
    return "typeScriptExpressServer";
  }

  @Override
  public String toApiName(String name) {
      if (name.length() == 0) {
          return "DefaultController";
      }
      return initialCaps(name);
  }

  @Override
  public String toApiFilename(String name) {
      return toApiName(name);
  }

  @Override
  public String apiFilename(String templateName, String tag) {
      String result = super.apiFilename(templateName, tag);

      if ( templateName.equals("controller.mustache") ) {
          String stringToMatch = File.separator + "controllers" + File.separator;
          String replacement = File.separator + implFolder + File.separator;
          result = StringUtils.replace(result, stringToMatch, replacement);
      }
      return result;
  }

  public String getHelp() {
    return "Generates a typeScriptExpressServer client library.";
  }

  public TypescriptexpressserverGenerator() {
    super();

    // set the output folder here
    outputFolder = "generated-code/typeScriptExpressServer";

    modelTemplateFiles.put(
      "model.mustache", // the template to use
      ".ts");       // the extension for each file to write

    /**
     * Api classes.  You can write classes for each Api file with the apiTemplateFiles map.
     * as with models, add multiple entries with different extensions for multiple files per
     * class
     */
    // apiTemplateFiles.put(
    //   "api.mustache",   // the template to use
    //   ".ts");       // the extension for each file to write

    apiTemplateFiles.put(
      "controller.mustache",   // the template to use
      ".ts");       // the extension for each file to write

    /**
     * Template Location.  This is the location which templates will be read from.  The generator
     * will use the resource stream to attempt to read the templates.
     */
    templateDir = "typeScriptExpressServer";

    /**
     * Api Package.  Optional, if needed, this can be used in templates
     */
    apiPackage = "apiModules";

    /**
     * Model Package.  Optional, if needed, this can be used in templates
     */
    modelPackage = "model";

    /**
     * Reserved words.  Override this with reserved words specific to your language
     */
    reservedWords = new HashSet<String> (
      Arrays.asList(
        "sample1",  // replace with static values
        "sample2")
    );

    /**
     * Additional Properties.  These values can be passed to the templates and
     * are available in models, apis, and supporting files
     */
    additionalProperties.put("apiVersion", apiVersion);
    additionalProperties.put("implFolder", implFolder);

    /**
     * Supporting Files.  You can write single files for the generator with the
     * entire object tree available.  If the input file has a suffix of `.mustache
     * it will be processed by the template engine.  Otherwise, it will be copied
     */
    supportingFiles.add(new SupportingFile("myFile.mustache",   // the input template or file
      "",                                                       // the destination folder, relative `outputFolder`
      "myFile.sample")                                          // the output file
    );

    /**
     * Language Specific Primitives.  These types will not trigger imports by
     * the client generator
     */
    languageSpecificPrimitives = new HashSet<>(Arrays.asList(
      "string",
      "String",
      "boolean",
      "Boolean",
      "Double",
      "Integer",
      "Long",
      "Float",
      "Object",
      "Array",
      "Date",
      "number",
      "any",
      "File",
      "Error",
      "Map"
      ));
  }

  /**
   * Escapes a reserved word as defined in the `reservedWords` array. Handle escaping
   * those terms here.  This logic is only called if a variable matches the reserved words
   * 
   * @return the escaped term
   */
  @Override
  public String escapeReservedWord(String name) {
    return "_" + name;  // add an underscore to the name
  }

  /**
   * Location to write model files.  You can use the modelPackage() as defined when the class is
   * instantiated
   */
  public String modelFileFolder() {
    return outputFolder + "/" + sourceFolder + "/" + modelPackage().replace('.', File.separatorChar);
  }

  /**
   * Location to write api files.  You can use the apiPackage() as defined when the class is
   * instantiated
   */
  @Override
  public String apiFileFolder() {
    // return outputFolder + "/" + sourceFolder + "/" + apiPackage().replace('.', File.separatorChar);
    return outputFolder + "/" + sourceFolder + "/" + apiPackage().replace('.', File.separatorChar);
  }


  @Override
  public String getArgumentsLocation() {
    return null;
  }

  @Override
  protected String getTemplateDir() {
    return templateDir;
  }

  @Override
  public String getDefaultTemplateDir() {
    return templateDir;
  }
}