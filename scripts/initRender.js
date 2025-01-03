/**
 * 生成render.ts文件
 * 后处理：
 * 1. 删除不需要的底层函数
 * 2. 删除abstract class Constants
 * 3. 删除所有未使用的声明
 * 4. 将Lute 替换为 window.Lute
 * 5. 从siyuan中更新导入 
 */
import { Project, StructureKind } from "ts-morph";
import path from "path";
import fs from "fs";
//const { Project } = require("ts-morph");
//!注意相对位置
const SiyuanPath = "../../0project_new/0clone_only/siyuan/app";
const TargetPath = path.resolve("./src/libs/render.ts");
const sourceFileReletivePath = "./src/protyle/util/processCode.ts";

async function main() {
  const SiyuanFullPath = path.resolve(SiyuanPath);
  const project = new Project();
  //* 项目全部文件，用于查找依赖
  const Files_All = project.addSourceFilesFromTsConfig(
    path.join(SiyuanPath, "tsconfig.json")
  );

  //*获取源文件信息
  const getSourceFile = () => {
    const processCodeFile = Files_All.find((file) => {
      return (
        path.resolve(file.getFilePath()) ===
        path.join(SiyuanFullPath, sourceFileReletivePath)
      );
    });
    return processCodeFile;
    // todo 获取函数无意义，因为不知道它的依赖函数(可能是本文件中其他函数，所以仅导入一个函数也要把整个文件都导入)
    //const ast = processCodeFile.getStructure();

    /*   const processRender = ast.statements.find((statement) => {
    if (statement.declarationKind !== "const") {
      return false;
    }
    return statement.declarations[0].name === "processRender";
  }); */
    /*   return {
    //func: processRender,
    file: processCodeFile,
    structure: ast.statements,
  }; */
  };
  const sourceFile = getSourceFile();
  //*筛选出的目标文件
  const TargetFilepaths = [path.join(SiyuanFullPath, sourceFileReletivePath)];
  const TargetFiles = [sourceFile];
  //* 获取所有依赖文件
  const getDependenciesFiles = (file) => {
    if (!file) {
      return [];
    }
    const ast = file.getStructure();
    const dependencies = ast.statements.filter((statement) => {
      return StructureKind.ImportDeclaration === statement.kind;
    });
    const paths = dependencies.map((dependency) => {
      return path.resolve(file.getDirectoryPath(), dependency.moduleSpecifier);
    });
    const files = paths.map((filepath) => {
      return Files_All.find((file) => {
        if (filepath + ".ts" === path.resolve(file.getFilePath())) {
          return true;
        } else if (
          filepath + "\\index.ts" ===
          path.resolve(file.getFilePath())
        ) {
          return true;
        }
        return false;
      });
    });
    const realPaths = files.map((file) => {
      return path.resolve(file.getFilePath());
    });
    //*过滤掉已经存在的文件，必须找到文件之后再过滤，因为不含后缀或index.ts
    const pathsFiltered = realPaths.filter((filepath) => {
      return !TargetFilepaths.includes(filepath);
    });
    const filesFiltered = files.filter((file) => {
      const filepath = path.resolve(file.getFilePath());
      return !TargetFilepaths.includes(filepath);
    });
    TargetFilepaths.push(...pathsFiltered);
    TargetFiles.push(...filesFiltered);
    return filesFiltered;
  };
  //const sourceFileDepandencies = getDependenciesFiles(sourceFile);
  const recursiveGetDependencies = (files) => {
    files.forEach((file) => {
      const dependencies = getDependenciesFiles(file);
      recursiveGetDependencies(dependencies);
    });
  };

  recursiveGetDependencies([sourceFile]);

  //*写入文件,注意写入顺序(反向)
  const writeFile = async () => {
    const TargetStatements = [];
    for (let i = TargetFiles.length - 1; i >= 0; i--) {
      const item = TargetFiles[i];
      item.getStructure().statements.forEach((statement) => {
        if (statement.kind !== StructureKind.ImportDeclaration) {
          //关闭导出
          if (statement.isExported && i != 0) {
            statement.isExported = false;
          }
          TargetStatements.push(statement);
        }
      });
    }
    const targetProject = new Project();
    const targetFile = targetProject.createSourceFile(
      TargetPath,
      {
        statements: TargetStatements,
      },
      { overwrite: true }
    );
    await targetFile.save();
  };
  const writeFileByFs = () => {
    let text = "";
    for (let i = TargetFilepaths.length - 1; i >= 0; i--) {
      const filePath = TargetFilepaths[i];
      text += fs.readFileSync(filePath, "utf-8");
    }
    fs.writeFileSync(TargetPath, text, "utf-8", { flag: "w+" });
  };
  writeFile();
  console.warn("完成");
}
main();
